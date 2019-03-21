<template>
  <form>
    <slot>
    </slot>
  </form>
</template>
<script>
export default {
  name: 'Form',
  provide () {
    // 这个是可以实现多层
    return {
      form: this
    };
  },
  data () {
    return {
      fields: []
    }
  },
  props: {
    rules: {
      type: Object
    },
    model: {
      type: Object
    }
  },
  created () {
    /**
     * 注意： Vue.js的组件渲染顺序是由内而外，所以FormItem要先于Form渲染
     * 在FormItem的mounted触发时，我们向Form派发事件 on-form-item-add，
     * 并且将当前FormItem的this传给Form，而此时，Form的mounted尚未触发，因为Form在最外层
     * 因此不能在mounted里面监听事件，需要在created里面自定义监听事件
     */
    this.$on('on-form-item-add', (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on('on-form-item-remove', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  }
}
</script>