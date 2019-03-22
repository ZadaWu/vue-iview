<template>
  <div>
    <label v-if="label"  :class="{ 'form-item-label-required': isRequired }">{{label}}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="form-item-message">{{validateMessage}}</div>
    </div>
  </div>
</template>
<script>
import Emitter from '@/mixins/emitter.js';
import AsyncValidator from 'async-validator';
import { error } from 'util';

export default {
  name: 'FromItem',
  data () {
    return {
      isRequired: false, // 是否为必填
      validateState: '', // 校验状态
      validateMessage: '', // 校验不通过时的提示信息
    }
  },
  inject: ['form'],
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
  computed: {
    filedValue () {
      return this.form.model[this.prop]
    }
  },
  methods: {
    setRules () {
      let rules = this.getRules() || [];
      rules.every((rule) => {
        // 如果当前校验规则中有必填项，则标记出来
        this.isRequired = rule.isRequired;
      });
      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange)
    },
    // 从 From 的 rules 属性中，获取当前 FormItem 的校验规则 
    getRules () {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return formRules;
    },
    // 只支持 blur 和 change， 所以过滤出符合要求的 rule 规则
    getFilterdRule (trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    // 校验数据
    validate (trigger, callback = () => {}) {
      let rules = this.getFilterdRule(trigger);

      if (!rules ||  rules.length === 0 ) {
        return true;
      }

      // 设置状态为较严重
      this.validateState = 'validating';

      // 以下为 async-validatoe 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.filedValue;
      validator.validate(model, {firstFields: true}, errors => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage);
      })
    },
    resetField () {
      this.validateState = this.validateMessage = '';
      this.form.model[this.prop] = this.initialValue;
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      this.validate('change');
    },
  },
  mounted () {
    if (this.prop) {
      this.dispatch('Form', 'on-form-item-add', this);

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.filedValue;

      this.setRules()
    }
  },
  // 组件销毁前，将实例从Form的缓存中移除
  beforeDestroy () {
    this.dispatch('Form', 'on-form-item-remove', this);
  }
}
</script>
<style>
  .form-item-label-required:before {
    content: '*';
    color: red;
  }
  .form-item-message {
    color: red;
  }
</style>
