<template>
  <div :class="['diagonal', 'border-' + color, 'diagonal--' + position]"></div>
</template>

<script>
export default {
  name: 'Divider',
  props: {
    position: {
      required: true,
      validator(value) {
        // The value must match one of these strings
        return ['top', 'bottom'].includes(value)
      }
    },
    color: {
      type: String,
      default: 'grey-100'
    }
  }
}
</script>

<style lang="scss">
.diagonal {
  width: 0;
  height: 0;
  border-style: solid;
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  --height: 40px;

  @screen md {
    --height: 80px;
  }

  @screen lg {
    --height: 100px;
  }

  &--bottom {
    bottom: 0;

    border-width: var(--height) 0 0 100vw;

    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }

  &--top {
    top: 0;

    border-width: 0 100vw var(--height) 0;

    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
}
</style>
