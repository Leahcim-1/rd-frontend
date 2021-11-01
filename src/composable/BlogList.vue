<template>
  <div
    class="bloglist-card-wrapper"  
    v-for="blog in blogs"
    :key='blog.id'
  >
    <n-card 
      :title='blog.title'
      :bordered="false"
      size='huge'
    >
      <template #header-extra>By {{ blog.author_name }}</template>
      <n-ellipsis>{{ blog.body }}</n-ellipsis>
      <template #footer> 
        Creadted  
      </template>
      <template #action> #action </template>
    </n-card>
    <n-divider width='600'></n-divider>
  </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { NCard, NEllipsis, NDivider } from 'naive-ui'
import { Blog } from '../type/blog'
import { fetchBlogLists } from '../api/index'



export default defineComponent({
  name: "BlogList",

  components: {
    NCard,
    NEllipsis,
    NDivider
  },

  setup() {
    const blogs = ref<Blog[]>([])

    const getBlogLists = async (config = {}) => {
      const res = await fetchBlogLists<Blog>(config)
      console.log(res.message)
      console.log(res.data)
      blogs.value = res.data
    }


    onMounted(async () => {
      await getBlogLists()
    })

    return {
      blogs, 
      getBlogLists
    }
  }
})
</script>
<style lang="scss">
  .bloglist-card-wrapper {
    max-width: 600px;
    padding: 0px 10px;
  }

  .n-card {
    max-width: 600px;
    margin-bottom: 15px;

  }
</style>