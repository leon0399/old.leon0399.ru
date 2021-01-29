<template>
  <div
    class="case case--card"
    :class="{
      'case--empty': empty
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCaseItemCard',

  props: {
    empty: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.case {
  &--card {
    @apply p-6;
    @apply relative;

    min-height: 440px;

    border-radius: 1.5rem;
    box-shadow: 0px 20px 120px rgba(0, 0, 0, 0.1);
  }

  &--empty {
    background-image: url('../../assets/img/glitch-corrupt.gif');
    background-repeat: repeat;
    background-position: center center;
  }
}
</style>
