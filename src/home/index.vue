<template>
  <div class="home">
    <h1>home</h1>
    <Button size="default">点我啊</Button>
  </div>
</template>

<script>
import Button from '@/component/i-button/index.js';

export default {
  components: {Button}
}
</script>

<style lang="stylus" scoped>
.home
  color red 
  font-size 80px
</style>