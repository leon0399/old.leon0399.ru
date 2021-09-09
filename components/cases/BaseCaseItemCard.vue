<template>
  <div
    class="case case--card"
    :class="{
      'case--empty': empty,
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
      default: false,
    },
  },
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

    will-change: transform, box-shadow;
    transition: transform 0.3s ease;

    &:hover {
      &:not(.case--empty) {
        transform: scale(1.05);
        transition-duration: 0.8s;
      }
    }
  }

  &--empty {
    cursor: not-allowed;

    background-image: url('../../assets/img/glitch-corrupt.gif');
    background-repeat: repeat;
    background-position: center center;
  }
}
</style>
