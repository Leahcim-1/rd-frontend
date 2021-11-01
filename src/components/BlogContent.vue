<template lang="">
  <div>
    <blog-list />
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import BlogList from '../composable/BlogList.vue'

export default defineComponent({
  components: {
    BlogList
  }
})
</script>
<style lang="">
  
</style>