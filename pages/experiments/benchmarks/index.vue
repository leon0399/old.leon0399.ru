<template>
  <article id="benchmarks" class="container mx-auto">
    <section class="grid gap-4 my-4 md:grid-cols-2">
      <div>
        <label for="selectLanguage" class="block my-2">Language</label>
        <multiselect
          id="selectLanguage"
          v-model="selectedLanguages"
          name="selected_languages"
          tag-placeholder="Add this as new language"
          placeholder="Search or add a language"
          multiple
          :taggable="true"
          :options="languages"
          :loading="$fetchState.pending"
        />
      </div>
      <div>
        <label for="selectTags" class="block my-2">Tags</label>
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
    >
      <h3 class="text-2xl font-montserrat font-bold py-2" v-text="group" />

      <div class="grid md:grid-cols-2 gap-4">
        <div v-for="(langs, script) in scripts" :key="`bench-script-${script}`">
          <bar-chart
            :height="300"
            :chart-id="script"
            :chart-data="toBarData(langs)"
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
                      suggestedMax: getMaxInCategory(group),
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
  </article>
</template>

<script>
/* eslint-disable no-unused-vars */

import map from 'lodash.map'
import mapValues from 'lodash.mapvalues'
import groupBy from 'lodash.groupby'
import toPairs from 'lodash.topairs'
import fromPairs from 'lodash.frompairs'
import pick from 'lodash.pick'

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import BarChart from '~/components/charts/Bar'

const languageColors = {
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  PHP: '#4F5D95',
  Python: '#3572A5',
  Ruby: '#701516',
  Rust: '#dea584',
}

const languageGroups = {
  'C++': 'Compiled',
  Go: 'Compiled',
  Java: 'Hybrid',
  JavaScript: 'Interpreted',
  PHP: 'Interpreted',
  Python: 'Interpreted',
  Ruby: 'Interpreted',
  Rust: 'Compiled',
}

export default {
  components: {
    BarChart,
    // eslint-disable-next-line vue/no-unused-components
    Multiselect,
  },

  data: () => ({
    results: {},
    tags: ['GraalVM'],
    selectedLanguages: [],
    selectedTags: [],
  }),

  async fetch() {
    const response = await this.$axios.get(
      'https://raw.githubusercontent.com/leon0399/benchmarks/master/.results/results.json'
    )
    this.results = response.data
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

              const tags = []

              if (configuration.includes('GraalVM')) {
                tags.push('GraalVM')
              }

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
      const groups = groupBy(pairs, ([k, v]) => k.substr(0, k.indexOf('/')))

      return mapValues(groups, (langs) => fromPairs(langs))
    },
  },

  methods: {
    getMaxInCategory(category) {
      const values = Object.values(this.groupedBenchmarks[category]).flatMap(
        (configurations) =>
          Object.values(configurations).map(
            ({ results }) => results.time.median
          )
      )

      return Math.max(...values)
    },
    toBarData(data) {
      const langs = Object.keys(data)
      const colors = Object.values(data).map(
        ({ language }) => languageColors[language]
      )

      return {
        labels: langs,
        datasets: [
          {
            label: 'Time, s',
            data: Object.values(data).map(({ results }) =>
              results.time.median.toFixed(3)
            ),
            backgroundColor: colors,
          },
        ],
      }
    },
  },
}
</script>
