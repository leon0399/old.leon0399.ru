<template>
  <div class="case case--card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCaseItemCard'
}
</script>

<style scoped lang="scss">
.case {
  &--card {
    @apply p-6 relative;

    min-height: 440px;

    border-radius: 1.5rem;
    box-shadow: 0px 20px 120px rgba(0, 0, 0, 0.1);
  }
}
</style>
