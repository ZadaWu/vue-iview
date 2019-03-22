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
  },
  methods: {
    // 公开方法： 重置全部数据
    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      });
    },
    // 公开方法： 全部校验数据，支持promise
    validate(callback) {
      return new Promise(resolve => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
             }
          })
        })
      });
    }
  }
}
</script>