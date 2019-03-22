<template>
  <div class="home">
    <h3>具有数据校验功能的表单组件——Form</h3>
    <Form ref="form" :model="formValidate" :rules="ruleValidate">
      <FormItem label="用户名" prop="name">
        <Input v-model="formValidate.name"/>
      </FormItem>
      <FormItem label="邮箱" prop="mail">
        <Input v-model="formValidate.mail"/>
      </FormItem>
    </Form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import Button from '@/component/i-button/index.js';
import Form from '@/component/i-form/index.js';
import FormItem from '@/component/i-form-item/index.js';
import Input from '@/component/i-input/index.js';

export default {
  data() {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
      }
    }
  },
  components: {Button, Form, FormItem, Input},
  methods: {
    handleClick () {
      console.log('yes ,it click');
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('提交成功');
        } else {
          window.alert('表单校验失败');
        }
      })
    },
    handleReset () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="stylus" scoped>
.home 
  font-size 14px
</style>