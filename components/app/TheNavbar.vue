<template>
  <nav :class="['navbar', 'flex', 'py-6', backgroundColor]">
    <div class="container flex items-center justify-between w-full mx-auto">
      <div class="flex">
        <nuxt-link
          to="/"
          :class="['font-montserrat', 'font-extrabold', textColor, 'text-2xl']"
        >
          L/M
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',

  props: {
    background: {
      type: String,
      default: 'dark',
    },
    color: {
      type: String,
      default: 'white',
    },
  },

  computed: {
    backgroundColor() {
      return 'bg-' + this.background
    },

    textColor() {
      return 'text-' + this.color
    },
  },
}
</script>

<style scoped lang="scss">
.navbar {
  min-height: 100px;
}
</style>
