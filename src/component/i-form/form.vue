<template>
  <form>
    <slot>
    </slot>
  </form>
</template>
<script>
export default {
  name: 'Form',
  props: {
    rules: {
      type: Object
    },
    model: {
      type: Object
    }
  }
}
</script>