<template>
  <div class="home">
    <h1>home</h1>
    <Button size="default" bType="button" shape="circle" @click="handleClick">点我啊</Button>
    <Form :model = "formModel">
      <FormItem label = "formModel.userName" prop="userName">
        {{formModel}}
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Button from '@/component/i-button/index.js';
import Form from '@/component/i-form/index.js';
import FormItem from '@/component/i-form-item/index.js';

export default {
  data() {
    return {
      formModel: {
        userName: 'wzm'
      }
    }
  },
  components: {Button, Form, FormItem},
  methods: {
    handleClick () {
      console.log('yes ,it click');
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  color red 
  font-size 80px
</style>