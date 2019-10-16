<template>
  <div id="index">
    <v-section
      id="intro"
      class="intro bg-dark relative flex items-center"
      divider-bottom-color="light"
      no-diagonal-padding-bottom
    >
      <div
        class="h-full container mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between"
      >
        <div
          class="intro__pathos w-100 lg:w-1/2 px-4 text-center lg:text-right font-montserrat font-bold text-white text-5xl"
        >
          <span class="intro__iam">I am the</span>
          <br />
          <span class="intro__title">Developer.</span>
        </div>
        <div class="intro__rose w-100 lg:w-1/2 px-4">
          <img src="~/assets/img/flower.gif" alt="Glitched flower" />
        </div>
      </div>
    </v-section>

    <v-section
      id="about"
      class="about bg-light relative"
      divider-bottom-color="white"
      large
    >
      <div class="container mx-auto flex justify-start">
        <div class="w-100 lg:w-2/3">
          <h1 class="font-montserrat font-extrabold text-5xl pb-2">
            Hello there!
          </h1>

          <p class="pb-4">
            My name is <strong>Leonid Meleshin</strong> and I am a
            <strong>Web Developer</strong> and
            <strong>Designer</strong> currently based
            <strong class="text-primary">Moscow, Russia</strong>.
          </p>

          <p class="pb-4">
            I really enjoy developing <strong>useful</strong>,
            <strong>powerful</strong> and
            <strong>beautiful</strong> applications.
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
              class="inline-block py-4 px-2"
            >
              <a :href="method.href" target="_blank" class="text-primary">
                {{ method.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </v-section>
  </div>
</template>

<script>
import VSection from '../components/app/VSection'
export default {
  components: { VSection },
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
      Facebook: {
        text: 'Facebook',
        href: 'https://fb.me/meleshin.l'
      }
    }
  })
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
  }

  &__rose {
    img {
      mix-blend-mode: lighten;
    }
  }
}
</style>
