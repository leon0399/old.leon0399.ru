<template>
  <div id="benchmarks">
    <section class="container mx-auto">
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
              :data="toBarData(langs)"
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

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BarChart,
  },

  data: () => ({
    results: {},
  }),

  async fetch() {
    const response = await this.$axios.get(
      'https://raw.githubusercontent.com/leon0399/benchmarks/master/.results/results.json'
    )
    this.results = response.data
  },

  head() {
    return {
      title: 'Complete Benchmark',
    }
  },

  computed: {
    groupedBenchmarks() {
      const pairs = toPairs(this.results).map(([script, langs]) => [
        script,
        fromPairs(
          toPairs(langs).flatMap(([lang, results]) => {
            const configurations = toPairs(results)

            return configurations.map(([conf, results]) => [
              lang === conf ? lang : `${lang} (${conf})`,
              results,
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
      const colors = langs
        .map((lang) =>
          lang.includes('(') ? lang.substr(0, lang.indexOf('(')).trim() : lang
        )
        .map((lang) => languageColors[lang])

      return {
        labels: langs,
        datasets: [
          {
            label: 'Time, s',
            data: Object.values(data).map((results) =>
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
