<template>
  <div id="index">
    <v-section
      id="intro"
      class="relative flex items-center intro bg-dark"
      divider-bottom-color="light"
      no-diagonal-padding-bottom
    >
      <div
        class="container flex flex-col items-center justify-center h-full mx-auto lg:flex-row lg:justify-between"
      >
        <div
          class="px-4 text-5xl font-bold text-center text-white intro__pathos w-100 lg:w-1/2 lg:text-right font-montserrat"
        >
          <span class="intro__iam glitch-text">I am the</span>
          <br />
          <no-ssr>
            <vue-typer
              :text="['Developer.', 'Designer.']"
              class="text-white intro__title"
              erase-delay="70"
              erase-style="backspace"
            ></vue-typer>
          </no-ssr>
        </div>
        <div class="px-4 intro__rose w-100 lg:w-1/2">
          <img src="~/assets/img/flower.gif" alt="Glitched flower" />
        </div>
      </div>
    </v-section>

    <v-section
      id="about"
      class="relative about bg-light"
      divider-bottom-color="white"
      large
    >
      <div class="container flex justify-start mx-auto">
        <div class="w-100 lg:w-2/3">
          <h1 class="pb-2 text-5xl font-extrabold font-montserrat">
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

          <p class="pb-4">
            Also, I’m a <strong>Pentester</strong> (widely known as
            <strong>Hacker</strong>), so I create not only cool looking
            projects, but also safe ones.
            <a href="#" class="text-primary">Read more...</a>
          </p>

          <ul>
            <li
              v-for="(method, index) in contactMethods"
              :key="'contact-' + index"
              class="inline-block px-2 py-4"
            >
              <a :href="method.href" target="_blank" class="text-primary">
                {{ method.text }}
              </a>
            </li>
          </ul>
        </div>
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

    <v-section
      id="jobs"
      class="z-10 jobs bg-dark"
      divider-top-color="white"
      no-diagonal-padding-top
    >
      <div class="container mx-auto">
        <timeline class="border-white lg:w-1/2">
          <timeline-item
            v-for="(job, index) in jobs"
            :key="'job-' + index"
            class="text-white"
          >
            <h3 class="text-lg font-extrabold font-montserrat">
              {{ job.position }} <span class="text-gray-500">at</span>
              <a :href="job.website" target="_blank" class="text-primary">
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
import VSection from '../components/section/VSection'
import VSectionHeading from '../components/section/VSectionHeading'

import BaseCaseItemCard from '../components/cases/BaseCaseItemCard'
import CaseAptekaItemCard from '../components/cases/CaseAptekaItemCard'

import Timeline from '../components/timeline/Timeline'
import TimelineItem from '../components/timeline/TimelineItem'

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
    BaseCaseItemCard
  },
  data: () => ({
    contactMethods: {
      mail: {
        text: 'Mail',
        href: 'mailto:leon.03.99@gmail.com'
      },
      telegram: {
        text: 'Telegram',
        href: 'https://tg.me/leon0399'
      },
      vk: {
        text: 'VK',
        href: 'https://vk.com/leon0399'
      },
      github: {
        text: 'Github',
        href: 'https://github.com/leon0399'
      }
    },
    cases: {
      first: {},
      second: {
        component: CaseAptekaItemCard
      },
      third: {},
      fourth: {}
    },
    jobs: {
      innoscripta: {
        position: 'Fullstack Developer',
        place: 'Innoscripta',
        website: 'https://www.innoscripta.com/',
        duration: 'November 2020 — Present',
        description: []
      },
      explabs: {
        position: 'Founder',
        place: 'Devolt.One',
        website: 'https://devolt.one/?ref=leon0399.ru',
        duration: 'March 2019 — August 2020',
        description: [
          'Own development studio management. Turnkey websites and custom-built CRM systems development using Laravel and Vue.js/Nuxt.js.'
        ]
      },
      codecomrade: {
        position: 'Developer',
        place: 'Codecomrade',
        website: 'https://codecomrade.net/',
        duration: 'August 2018 — March 2019',
        description: [
          'Custom CRM Development for a major government customer (NDA) using Laravel and Vue.js.'
        ]
      },
      va: {
        position: 'Developer',
        place: '#VA',
        website: 'https://va-promotion.ru/',
        duration: 'October 2017 — August 2018',
        description: [
          'Turnkey websites Development on Wordpress and Laravel. Theme development, layout and integration.'
        ]
      },
      amska: {
        position: 'Developer',
        place: 'AMSKA',
        website: 'http://amska.ru/',
        duration: 'November 2016 — January 2017',
        description: ['1С Websites content and integration']
      }
    }
  }),
  head() {
    return {
      title: 'Leonid Meleshin'
    }
  }
}
</script>

<style lang="scss">
.intro {
  min-height: calc(100vh - 100px);

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
