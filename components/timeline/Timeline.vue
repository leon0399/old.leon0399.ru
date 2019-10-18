<template>
  <div
    :class="{
      timeline: true,
      'timeline--left': !right,
      'timeline--right': right
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    right: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.timeline {
  --border-width: 9px;

  &--left,
  &--right {
  }

  &--left {
    border-left-style: solid;
    border-left-width: var(--border-width);
  }
  &--right {
    border-right-style: solid;
    border-right-width: var(--border-width);
  }
}
</style>
