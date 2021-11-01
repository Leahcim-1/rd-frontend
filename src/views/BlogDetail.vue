<template>
  <BackArrow :size='24' />
  <div id="blog-detail-wrapper" v-if="blog">
    <h1>{{ blog.title }}</h1>
    <h3>{{ blog.subtitle }}</h3>
    <p>{{ blog.author_name }}</p>
    <p>{{ blog.created_time }}</p>
    <p>{{ blog.updated_time }}</p>
    <p>{{ blog.body }}</p>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Blog } from '../type/blog'
import { fetchBlogDetail } from '../api/index'
import BackArrow from '../composable/BackwardArrow.vue'

export default defineComponent({
  components: {
    BackArrow
  },
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

    return {
      blog,
      blogId,
      getBlogDetail
    }
    
  }
})
</script>
<style lang="scss">
#blog-detail-wrapper {
  padding: 36px;
}
  
</style>