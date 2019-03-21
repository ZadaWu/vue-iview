<template>
  <div>
    <label v-if="label">{{label}}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Emitter from '@/mixins/emitter.js';

export default {
  name: 'FromItem',
  mixins: [Emitter],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('Form', 'on-form-item-add', this);
    }
  },
  // 组件销毁前，将实例从Form的缓存中移除
  beforeDestroy () {
    this.dispatch('Form', 'on-form-item-remove', this);
  }
}
</script>
