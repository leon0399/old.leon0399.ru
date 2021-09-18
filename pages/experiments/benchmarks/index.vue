<template>
  <article id="benchmarks" class="container mx-auto">
    <section class="grid gap-4 my-4 md:grid-cols-2">
      <div
        role="tablist"
        aria-orientation="horizontal"
        class="flex space-x-1 rounded"
      >
        <button
          v-for="(name, key) in types"
          :key="`type-${key}`"
          class="
            w-full
            py-2
            rounded
            border border-gray-200
            focus:outline-none focus:ring
          "
          :class="{
            'bg-gray-200': selectedType === key,
            'hover:bg-gray-100': selectedType !== key,
          }"
          :aria-selected="selectedType === key"
          role="tab"
          @click="() => (selectedType = key)"
          v-text="name"
        />
      </div>
      <div />
      <div>
        <label for="selectLanguage" class="inline-block my-2">Language</label>
        <multiselect
          id="selectLanguage"
          v-model="selectedLanguages"
          name="selected_languages"
          tag-placeholder="Add this as new language"
          placeholder="Search or add a language"
          multiple
          group-label="name"
          group-values="languages"
          group-select
          :taggable="true"
          :options="groupedLanguages"
          :loading="$fetchState.pending"
        >
          <template #tag="{ option, remove }">
            <span
              class="multiselect__tag multiselect__tag--language"
              :class="
                isDark(languageColors[option])
                  ? 'multiselect__tag--dark'
                  : 'multiselect__tag--light'
              "
              :style="{
                backgroundColor: languageColors[option],
              }"
            >
              <span v-text="option" />
              <i
                aria-hidden="true"
                tabindex="1"
                class="multiselect__tag-icon"
                @click="() => remove(option)"
              />
            </span>
          </template>
        </multiselect>
      </div>
      <div>
        <label for="selectTags" class="inline-block my-2">Tags</label>
        <multiselect
          id="selectTags"
          v-model="selectedTags"
          name="selected_tags"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          multiple
          :taggable="true"
          :options="tags"
          :loading="$fetchState.pending"
        />
      </div>
    </section>

    <section
      v-for="(scripts, group) in groupedBenchmarks"
      :key="`bench-group-${group}`"
      class="my-16"
    >
      <h3 class="text-2xl font-montserrat font-bold py-2" v-text="group" />

      <div class="grid md:grid-cols-2 gap-4">
        <div v-for="(langs, script) in scripts" :key="`bench-script-${script}`">
          <bar-chart
            :height="300"
            :chart-id="script"
            :chart-data="toBarData(langs, selectedType)"
            :options="{
              responsive: true,
              legend: {
                display: false,
                position: 'top',
              },
              title: {
                display: true,
                text: script,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      suggestedMax: getMaxInCategory(group, selectedType),
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }"
          />
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-3xl font-semibold pb-3">About this project</h2>
      <p></p>

      <h3 class="text-2xl font-semibold py-2">Links</h3>

      <ul class="list-disc pl-8 py-2">
        <li>
          <a
            href="https://github.com/leon0399/benchmarks"
            target="_blank"
            class="text-primary"
          >
            Github
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
/* eslint-disable no-unused-vars */

// import map from 'lodash.map'
import mapValues from 'lodash.mapvalues'
import groupBy from 'lodash.groupby'
import toPairs from 'lodash.topairs'
import fromPairs from 'lodash.frompairs'
// import pick from 'lodash.pick'

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import BarChart from '~/components/charts/Bar'

const benchmarkTitles = {
  primes: 'Prime Numbers',
  'primes/Atkin': 'Sieve of Atkin',
  collatz: 'Collatz Conjecture',
  'collatz/MaxSequence': 'Find longest sequence',
  mandelbrot: 'Mandelbrot Set',
  'mandelbrot/Simple': 'Not-Colored',
  treap: 'Treap',
  'treap/Naive': 'Naive Implementation',
  recursion: 'Recursion',
  'recursion/Tak': 'TAK function',
  io: 'I/O',
}

const languageGroups = {
  Interpreted: ['JavaScript', 'PHP', 'Python', 'Ruby'],
  Compiled: ['C++', 'Go', 'Java', 'Kotlin', 'Rust'],
}

export default {
  components: {
    BarChart,
    Multiselect,
  },

  data: () => ({
    types: {
      time: 'Time',
      memory: 'Memory',
    },
    selectedType: 'time',
    results: {},
    languageColors: {
      'C++': '#f34b7d',
      Go: '#00ADD8',
      Java: '#b07219',
      JavaScript: '#f1e05a',
      PHP: '#4F5D95',
      Python: '#3572A5',
      Ruby: '#701516',
      Rust: '#dea584',
    },
    selectedLanguages: [],
    selectedTags: ['JIT'],
  }),

  async fetch() {
    const languageColors = await this.$axios.get(
      'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'
    )
    this.languageColors = fromPairs(
      toPairs(languageColors.data).map(([lang, { color }]) => [lang, color])
    )

    const results = await this.$axios.get(
      'https://raw.githubusercontent.com/leon0399/benchmarks/master/.results/results.json'
    )
    this.results = results.data
    this.selectedLanguages = this.languages
  },

  fetchOnServer: false,

  head() {
    return {
      title: 'Complete Benchmark',
    }
  },

  computed: {
    languages() {
      return [
        ...new Set(
          Object.values(this.results).flatMap((langs) => Object.keys(langs))
        ),
      ]
    },
    groupedLanguages() {
      const languageGroupsPairs = toPairs(languageGroups)

      return toPairs(
        groupBy(
          this.languages,
          (lang) =>
            languageGroupsPairs.find(([group, langs]) =>
              langs.includes(lang)
            )?.[0] ?? 'Other'
        )
      )
        .sort((name) => Object.keys(languageGroups).indexOf(name) ?? 999)
        .map(([name, languages]) => ({
          name,
          languages,
        }))
    },
    tags() {
      return [
        ...new Set(
          toPairs(this.transformedResults).flatMap(([_, configurations]) =>
            toPairs(configurations).flatMap(([_, { tags }]) => tags)
          )
        ),
      ]
    },
    transformedResults() {
      const pairs = toPairs(this.results).map(([script, langs]) => [
        script,
        fromPairs(
          toPairs(langs).flatMap(([language, results]) => {
            const configurations = toPairs(results)

            return configurations.map(([configuration, results]) => {
              const title =
                language === configuration
                  ? language
                  : `${language} (${configuration})`

              results.memory.median /= 1024 * 1024
              results.memory.delta /= 1024 * 1024
              results.memory.results = results.memory.results.map(
                (memory) => memory / (1024 * 1024)
              )

              const { tags } = results

              return [
                title,
                {
                  language,
                  tags,
                  configuration,
                  results,
                },
              ]
            })
          })
        ),
      ])

      return fromPairs(pairs)
    },
    filteredResults() {
      return fromPairs(
        toPairs(this.transformedResults).map(([script, results]) => {
          results = fromPairs(
            toPairs(results)
              .filter(([_, { language }]) =>
                this.selectedLanguages.includes(language)
              )
              .filter(
                ([_, { tags }]) =>
                  !tags.length ||
                  (!this.selectedTags.length && !tags.length) ||
                  tags.filter((tag) => this.selectedTags.includes(tag)).length
              )
          )

          return [script, results]
        })
      )
    },
    groupedBenchmarks() {
      const pairs = toPairs(this.filteredResults)
      const groups = groupBy(pairs, ([k, v]) => {
        const group = k.substr(0, k.indexOf('/'))

        return benchmarkTitles[group] ?? group
      })

      return mapValues(groups, (langs) =>
        fromPairs(
          langs.map(([bench, confs]) => [
            benchmarkTitles[bench] ?? bench,
            confs,
          ])
        )
      )
    },
  },

  methods: {
    // https://stackoverflow.com/a/12043228
    isDark(c) {
      c = c.substring(1) // strip #
      const rgb = parseInt(c, 16) // convert rrggbb to decimal
      // eslint-disable-next-line prettier/prettier
      const r = (rgb >> 16) & 0xFF // extract red
      // eslint-disable-next-line prettier/prettier
      const g = (rgb >> 8) & 0xFF // extract green
      // eslint-disable-next-line prettier/prettier
      const b = (rgb >> 0) & 0xFF // extract blue

      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

      return luma < 128
    },
    getMaxInCategory(category, type) {
      const values = Object.values(this.groupedBenchmarks[category]).flatMap(
        (configurations) =>
          Object.values(configurations).map(
            ({ results }) => results[type].median
          )
      )

      return Math.max(...values)
    },
    toBarData(data, type) {
      const langs = Object.keys(data)
      const colors = Object.values(data).map(
        ({ language }) => this.languageColors[language]
      )

      return {
        labels: langs,
        datasets: [
          {
            label: this.selectedType === 'memory' ? 'Memory, MiB' : 'Time, s',
            data: Object.values(data).map(({ results }) =>
              results[type].median.toFixed(3)
            ),
            backgroundColor: colors,
          },
        ],
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.multiselect__tag {
  &--language {
    color: inherit;

    > .multiselect__tag-icon {
      &:after {
        color: inherit;
      }
    }

    &.multiselect__tag--light {
      color: #000;

      > .multiselect__tag-icon {
        &:hover,
        &:focus {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }

    &.multiselect__tag--dark {
      color: #fff;

      > .multiselect__tag-icon {
        &:hover,
        &:focus {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }

    > .multiselect__tag-icon {
      &:focus {
        // outline: none;
      }
    }
  }
}
</style>
