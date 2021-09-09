<template>
  <div>
    <the-navbar />

    <nuxt />
  </div>
</template>

<script>
import TheNavbar from '../components/app/TheNavbar'

export default {
  components: {
    TheNavbar,
  },
}
</script>

<style>
html {
  @apply font-sans overflow-x-hidden overflow-y-auto;

  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
