<template>
  <button :class="'i-button-size' + size" :disabled = "disabled" @click="handleClick">
    <slot></slot>
    <slot name="icon"></slot>
  </button>
</template>
<script>
// 判断参数是否是其中之一
function oneOf(value, validlist) {
  return (validlist.filter(item => item === value) || []).length > 0
}

export default {
  name: 'Button',
  props: {
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('on-click', event)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>

