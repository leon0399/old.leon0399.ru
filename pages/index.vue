<template>
  <div id="intro" class="intro flex items-center">
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
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.intro {
  @apply bg-dark;

  min-height: calc(100vh - 100px);

  &__pathos {
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
