<template>
  <div v-if="blog">
    <h1>{{ blog.title }}</h1>
    <h3>{{ blog.subtitle }}</h3>
    <p>{{ blog.author_name }}</p>
    <p>{{ blog.created_time }}</p>
    <p>{{ blog.updated_time }}</p>
    <p>{{ blog.body }}</p>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Blog } from '../type/blog'
import { fetchBlogDetail } from '../api/index'

export default defineComponent({
  setup() {
    const route = useRoute()
    const blog = ref<Blog>()
    const blogId = computed(() => route.params.id)

    const getBlogDetail = async (config = {}) => {
      const res = await fetchBlogDetail<Blog>(blogId.value as string, config)
      if (res.data.length > 0) blog.value = res.data[0]
    }

    onMounted(async () => {
      await getBlogDetail()
    })

    watch(
      () => route.params.id,
      async newBlogId => {
        console.log(newBlogId)
        await getBlogDetail()
        console.log(blog.value)
      }
    )

    return {
      blog,
      blogId,
      getBlogDetail
    }
    
  }
})
</script>
<style lang="">
  
</style>