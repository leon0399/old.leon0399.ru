<template>
  <div id="index">
    <v-section id="intro" class="relative flex items-center intro bg-dark">
      <div
        class="
          container
          flex flex-col
          lg:flex-row lg:justify-between
          items-center
          justify-center
          gap-8
          h-full
          mx-auto
        "
      >
        <div
          class="
            px-4
            text-5xl
            font-bold
            text-center text-white
            intro__pathos
            w-100
            lg:w-1/2 lg:text-right
            font-montserrat
          "
        >
          <span class="intro__iam glitch-text">I am the</span>
          <br />
          <no-ssr>
            <vue-typer
              :text="['Developer.', 'Engineer.']"
              class="text-white intro__title"
              :erase-delay="70"
              erase-style="backspace"
            ></vue-typer>
          </no-ssr>
        </div>
        <div class="px-4 intro__rose w-100 lg:w-1/2">
          <img :src="selectedImage" alt="Glitched flower" />
        </div>
      </div>
    </v-section>

    <v-section id="about" class="relative about" large>
      <div class="container flex justify-start mx-auto">
        <div class="w-100 lg:w-2/3">
          <h1 class="pb-6 text-5xl font-extrabold font-montserrat">
            Hello there!
          </h1>

          <p class="pb-4">
            My name is <strong>Leonid Meleshin</strong> and I am a
            <strong>Fullstack Developer</strong> currently based
            <strong class="text-primary">Moscow, Russia</strong>.
          </p>

          <p class="pb-4">
            I really enjoy developing 💡 <strong>useful</strong> 💡, 💪
            <strong>powerful</strong> 💪 and ✨ <strong>beautiful</strong> ✨
            applications.
          </p>

          <ul>
            <li
              v-for="(method, index) in contactMethods"
              :key="'contact-' + index"
              class="inline-block px-2 py-4"
            >
              <a
                :href="method.href"
                target="_blank"
                class="text-primary"
                rel="nofollow"
              >
                {{ method.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </v-section>

    <v-section id="experimants" class="relative bg-gray-200">
      <v-section-heading
        class="container mx-auto"
        title="Experiments"
        sub-title="Funny little things"
      />
      <div class="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <nuxt-link
          :to="'/experiments/benchmarks'"
          class="
            flex flex-col-reverse
            md:flex-row
            justify-start
            md:justify-between
            items-center
            md:items-start
            text-center
            md:text-left
            p-6
            gap-4
            rounded-3xl
            bg-white
            border border-black
          "
        >
          <div class="">
            <h3 class="font-montserrat font-black text-3xl">Benchmarks</h3>
            <p class="py-2 text-sm text-gray-900">
              (Not) scientific measurments of programming languages performance
            </p>
          </div>
          <picture v-lazy-container="{ selector: 'img' }" class="flex-shrink-0">
            <img
              :data-loading="
                require('~/assets/img/experiments/benchmarks/rocket.png?lqip')
              "
              :data-src="
                require('~/assets/img/experiments/benchmarks/rocket.png?size=128')
              "
              :data-srcset="`
                ${require('~/assets/img/experiments/benchmarks/rocket.png?size=128')} 1x,
                ${require('~/assets/img/experiments/benchmarks/rocket.png?size=256')} 2x,
                ${require('~/assets/img/experiments/benchmarks/rocket.png?size=384')} 3x
              `"
              alt="Benchmarks"
              class="block w-32 h-32"
              loading="lazy"
            />
          </picture>
        </nuxt-link>
      </div>
    </v-section>

    <v-section id="cases" class="relative cases">
      <v-section-heading
        class="container mx-auto"
        title="Cases"
        sub-title="Things, I'm proud"
      />

      <div class="flex overflow-x-auto scrolling-touch cases__items">
        <div class="z-50 flex justify-start mx-auto cases__items-shadow">
          <component
            :is="_case.component ? _case.component : 'base-case-item-card'"
            v-for="(_case, index) in cases"
            :key="'case-' + index"
            :empty="!_case.component"
          ></component>
        </div>
      </div>
    </v-section>

    <v-section id="jobs" class="z-10 jobs bg-dark">
      <div class="container mx-auto">
        <timeline class="border-white lg:w-1/2">
          <timeline-item
            v-for="(job, index) in jobs"
            :key="'job-' + index"
            class="text-white"
          >
            <h3 class="text-lg font-extrabold font-montserrat">
              {{ job.position }} <span class="text-gray-500">at</span>
              <a
                :href="job.website"
                target="_blank"
                rel="nofollow"
                class="text-primary"
              >
                {{ job.place }}
              </a>
            </h3>
            <span class="text-sm text-gray-500">
              {{ job.duration }}
            </span>
            <p
              v-for="(p, pIndex) in job.description"
              :key="'job-' + index + '-p-' + pIndex"
              class="text-sm"
            >
              {{ p }}
            </p>
          </timeline-item>
        </timeline>
      </div>
    </v-section>
  </div>
</template>

<script>
import VSection from '~/components/section/VSection'
import VSectionHeading from '~/components/section/VSectionHeading'

import BaseCaseItemCard from '~/components/cases/BaseCaseItemCard'
import CaseDevoltOneItemCard from '~/components/cases/CaseDevoltOneItemCard'
import CaseAptekaItemCard from '~/components/cases/CaseAptekaItemCard'

import Timeline from '~/components/timeline/Timeline'
import TimelineItem from '~/components/timeline/TimelineItem'

import ImageFlower from '~/assets/img/hero/flower.gif'
import ImageBall from '~/assets/img/hero/ball.gif'

const heroes = [ImageFlower, ImageBall]

let VueTyper = null
if (process.browser) {
  VueTyper = require('vue-typer').VueTyper
}

export default {
  components: {
    VueTyper,
    Timeline,
    TimelineItem,
    VSection,
    VSectionHeading,
    BaseCaseItemCard,
  },
  data: () => ({
    selectedImage: null,
    contactMethods: {
      telegram: {
        text: 'Telegram',
        href: 'https://t.me/leon0399',
      },
      linkedin: {
        text: 'LinkedIn',
        href: 'https://www.linkedin.com/in/leonid-meleshin-9604111a9/',
      },
      github: {
        text: 'Github',
        href: 'https://github.com/leon0399',
      },
      vk: {
        text: 'VK',
        href: 'https://vk.com/leon0399',
      },
      mail: {
        text: 'Mail',
        href: 'mailto:leon.03.99@gmail.com',
      },
    },
    cases: {
      first: {
        component: CaseDevoltOneItemCard,
      },
      second: {
        component: CaseAptekaItemCard,
      },
      third: {},
      fourth: {},
    },
    jobs: {
      innoscripta: {
        position: 'Fullstack Developer',
        place: 'innoscripta GmbH',
        website: 'https://www.innoscripta.com/',
        duration: 'October 2020 — Present',
        description: [],
      },
      explabs: {
        position: 'Founder',
        place: 'Devolt.One',
        website: 'https://devolt.one/?ref=leon0399.ru',
        duration: 'March 2019 — August 2020',
        description: [
          'Own development studio management. Turnkey websites and custom-built CRM systems development using Laravel and Vue.js/Nuxt.js.',
        ],
      },
      codecomrade: {
        position: 'Developer',
        place: 'Codecomrade',
        website: 'https://codecomrade.net/',
        duration: 'August 2018 — March 2019',
        description: [
          'Custom CRM Development for a major government customer (NDA) using Laravel and Vue.js.',
        ],
      },
      va: {
        position: 'Developer',
        place: '#VA',
        website: 'https://va-promotion.ru/',
        duration: 'October 2017 — August 2018',
        description: [
          'Turnkey websites Development on Wordpress and Laravel. Theme development, layout and integration.',
        ],
      },
      amska: {
        position: 'Developer',
        place: 'AMSKA',
        website: 'http://amska.ru/',
        duration: 'November 2016 — January 2017',
        description: ['1С Websites content and integration'],
      },
    },
  }),
  head() {
    return {
      title: 'Leonid Meleshin',
    }
  },
  created() {
    this.selectedImage = heroes[Math.floor(Math.random() * heroes.length)]
  },
}
</script>

<style lang="scss">
img[lazy='loading']:not(.no-blur) {
  filter: blur(15px);
}

.intro {
  height: calc(90vh - 100px);
  max-height: 1080px;

  &__pathos {
    @apply leading-none;

    @screen lg {
      font-size: 6rem;
    }

    .vue-typer {
      .custom {
        &.char {
          @apply text-white;
        }

        &.caret {
          @apply bg-white;
        }
      }
    }
  }

  &__rose {
    img {
      mix-blend-mode: lighten;
    }
  }
}

.cases {
  &__items {
    margin-top: -100px;
    margin-bottom: -140px;

    .case--card {
      margin-right: 15px;
      margin-left: 15px;

      width: 283px;
    }
  }

  &__items-shadow {
    padding-top: 100px;
    padding-bottom: 140px;

    -ms-overflow-style: none; // IE 10+
    scrollbar-width: none; // Firefox
    &::-webkit-scrollbar {
      display: none; // Safari and Chrome
      width: 0;
      height: 0;
    }
  }
}

.jobs {
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  .timeline {
    padding-top: calc(8rem + 40px);
    padding-bottom: 8rem;
  }
}
</style>
