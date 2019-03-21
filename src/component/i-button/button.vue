<template>
  <button type="bType" :class="classes" :disabled = "disabled" @click="handleClick">
    <slot></slot>
    <slot name="icon"></slot>
  </button>
</template>
<script>
// 判断参数是否是其中之一
import {oneOf} from '@/utils/assist.js';
const prefixCls = 'ivu-btn';

export default {
  name: 'Button',
  props: {
    type: {
      validator (value) {
        return oneOf(value, ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'])
      },
      default: 'default'
    },
    shape: {
      validator (value) {
        return oneOf(value, ['circle', 'circle-outline'])
      }
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default () {
        return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
      }
    },
    loading: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    bType: {
      validator (value) {
        return oneOf(value, ['button', 'submit', 'reset'])
      },
      default: 'button'
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: this.size !== 'default',
          [`${prefixCls}-${this.loading}`]: this.loading !== null && this.loading
        }
      ];
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>

