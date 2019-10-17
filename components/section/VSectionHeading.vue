<template>
  <div class="section__heading w-full text-center">
    <slot name="title">
      <h2 v-if="title" class="text-4xl font-montserrat font-bold pb-4">
        {{ title }}
      </h2>
    </slot>
    <slot name="sub-title">
      <span v-if="subTitle" class="text-2xl">{{ subTitle }}</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'VSectionHeading',
  props: {
    title: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.section__heading {
  @apply mb-16;
}
</style>
