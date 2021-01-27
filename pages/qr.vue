<template>
  <div class="qr qr--right">
    <section
      id="intro"
      class="relative flex items-center py-32 text-white intro bg-dark"
    >
      <div class="container flex justify-start mx-auto">
        <div class="w-100 lg:w-2/3">
          <h1 class="pb-2 text-5xl font-extrabold">
            Wow! You scanned me?
          </h1>

          <p class="pb-4">
            Thank you for scanning my hand! My name is
            <strong>Leonid Meleshin</strong>.
          </p>

          <p class="pb-4">
            I hope nothing bad happend, but anyway, there is some useful info
            below.
          </p>
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
            <li>No known allergies</li>
            <li>No medications</li>
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
  }
}
</script>

<style lang="scss" scoped>
.emergency {
  background-color: #b22432;
}
</style>
