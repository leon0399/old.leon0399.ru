<template>
  <div class="timeline__item">
    <div class="timeline__item-dot"></div>

    <div class="timeline__item-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineItem'
}
</script>

<style scoped lang="scss">
.timeline {
  &__item {
    position: relative;

    margin-top: 4rem;
    margin-bottom: 4rem;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item-dot {
    position: absolute;

    top: 1.25rem;

    height: 25px;
    width: 25px;

    background-color: #212121;

    border-color: #fff;
    border-width: 5px;
    border-radius: 100%;

    box-sizing: border-box;
  }

  &__item-content {
    padding: 1.25rem;
  }

  &--left {
    .timeline__item-dot {
      left: -17px;
    }
  }

  &--right {
    .timeline__item-dot {
      right: -17px;
    }
  }
}
</style>
