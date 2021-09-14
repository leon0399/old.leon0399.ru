<template>
  <div id="benchmarks">
    <section class="container mx-auto">
      <multiselect
        v-model="selectedLanguages"
        class="my-4"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        multiple
        :taggable="true"
        :options="languages"
      />

      <div
        v-for="(scripts, group) in groupedBenchmarks"
        :key="`bench-group-${group}`"
      >
        <h3 class="text-2xl font-montserrat font-bold py-2" v-text="group" />

        <div class="grid md:grid-cols-2 gap-4">
          <div
            v-for="(langs, script) in scripts"
            :key="`bench-script-${script}`"
          >
            <bar-chart
              :chart-data="toBarData(langs)"
              :options="{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: script,
                  },
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
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
    selectedLanguages: [],
  }),

  async fetch() {
    const response = await this.$axios.get(
      'https://raw.githubusercontent.com/leon0399/benchmarks/master/.results/results.json'
    )
    this.results = response.data
    this.selectedLanguages = this.languages
  },

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
    filteredResults() {
      return fromPairs(
        toPairs(this.results).map(([script, results]) => {
          results = pick(results, this.selectedLanguages)

          return [script, results]
        })
      )
    },
    groupedBenchmarks() {
      const pairs = toPairs(this.filteredResults).map(([script, langs]) => [
        script,
        fromPairs(
          toPairs(langs).flatMap(([language, results]) => {
            const configurations = toPairs(results)

            return configurations.map(([configuration, results]) => [
              language === configuration
                ? language
                : `${language} (${configuration})`,
              {
                language,
                configuration,
                results,
              },
            ])
          })
        ),
      ])

      const groups = groupBy(pairs, ([k, v]) => k.substr(0, k.indexOf('/')))

      return mapValues(groups, (langs) => fromPairs(langs))
    },
  },

  methods: {
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
