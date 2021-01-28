<template>
  <div class="qr qr--right">
    <section id="intro" class="items-center text-white bg-dark md:relative">
      <div class="container flex flex-col justify-start mx-auto md:flex-row">
        <div class="py-12 mt-64 w-100 lg:w-2/3 md:mt-0">
          <h1 class="my-2 text-5xl font-extrabold">
            Wow! You scanned me?
          </h1>

          <p class="my-4">
            Thank you for scanning my hand! My name is
            <strong>Leonid Meleshin</strong>.
          </p>

          <p class="my-4">
            I hope nothing bad happend, but anyway, there is some useful info
            below.
          </p>

          <a
            href="/vcard.vcf"
            class="inline-flex justify-center w-full px-6 py-3 my-8 text-center text-white bg-primary md:w-auto"
          >
            Add to contacts
          </a>

          <ul class="flex flex-row justify-between gap-2 md:justify-start">
            <li
              v-for="(method, index) in contactMethods"
              :key="'contact-' + index"
              class="inline-block"
            >
              <a :href="method.href" target="_blank" class="text-primary">
                {{ method.text }}
              </a>
            </li>
          </ul>
        </div>

        <div
          class="flex flex-col items-center justify-center md:justify-end hand hand--mobile"
        >
          <img
            src="~/assets/img/hand.png"
            class="absolute top-0 transform md:relative hand__image h-96 md:top-auto md:bottom-0 md:rotate-180 md:h-auto"
            alt="Hand"
          />
        </div>
      </div>
    </section>
    <section id="emergency" class="py-6 emergency">
      <div class="container flex flex-col gap-6 mx-auto text-white md:flex-row">
        <div
          class="flex flex-row text-4xl font-bold text-center border-4 border-white md:w-1/2 xl:w-1/3"
        >
          <div class="flex-1 px-8 py-4 border-r-4 border-white">O(I)</div>
          <div class="px-8 py-4">Rh+</div>
        </div>
        <div class="md:w-1/2">
          <ul class="text-lg">
            <li><strong>No</strong> known allergies</li>
            <li><strong>No</strong> medications</li>
            <li>Conditions: <strong>Hypertension</strong></li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VSection from '../components/section/VSection'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VSection
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
        text: 'Instagram',
        href: 'https://instagram.com/leon0399'
      },
      github: {
        text: 'LinkedIn',
        href: 'https://linkedin.com/leon0399'
      }
    }
  }),
  head: {
    title: 'My right hand'
  }
}
</script>

<style lang="scss" scoped>
.emergency {
  background-color: #b22432;
}

.hand {
  &__image {
    mix-blend-mode: screen;
  }
}
</style>
