<template>
  <section :class="classes">
    <diagonal v-if="dividerTopColor" position="top" :color="dividerTopColor" />

    <slot />

    <diagonal
      v-if="dividerBottomColor"
      position="bottom"
      :color="dividerBottomColor"
    />
  </section>
</template>

<script>
import Diagonal from '../app/Diagonal'

export default {
  name: 'Section',
  components: { Diagonal },
  props: {
    dividerTopColor: {
      type: String,
      default: null
    },
    dividerBottomColor: {
      type: String,
      default: null
    },
    noDiagonalPaddingTop: {
      type: Boolean,
      default: false
    },
    noDiagonalPaddingBottom: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        section: true,
        'section--large': this.large,
        'section--diagonal-top':
          this.dividerTopColor && !this.noDiagonalPaddingTop,
        'section--diagonal-bottom':
          this.dividerBottomColor && !this.noDiagonalPaddingBottom
      }
    }
  }
}
</script>

<style scoped lang="scss">
.section {
  @apply py-16 relative;

  &--diagonal-bottom {
    padding-bottom: calc(4rem + 40px);
  }

  &--large {
    @apply py-32;

    &--diagonal-bottom {
      padding-bottom: calc(8rem + 40px);
    }
  }
}
</style>
