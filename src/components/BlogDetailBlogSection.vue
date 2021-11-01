<template>
  <div id="blog-detail-wrapper" v-if="blog">
    <h1>{{ blog.title }}</h1>
    <h3>{{ blog.subtitle }}</h3>
    <p>By {{ blog.author_name }}</p>
    <p>{{ blog.body }}</p>
    <p>Published: {{ getDateString(blog.created_time) }}</p>
    <p>Last Updated By: {{ getDateString(blog.updated_time) }}</p>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Blog } from "../type/blog";
import { fetchBlogDetail } from "../api/index";

export default defineComponent({
  setup() {
    const route = useRoute();
    const blog = ref<Blog>();
    const blogId = computed(() => route.params.id);

    const getBlogDetail = async (config = {}) => {
      const res = await fetchBlogDetail<Blog>(blogId.value as string, config);
      if (res.data.length > 0) blog.value = res.data[0];
    };

    const getDateString = (date: string) => {
      const timeStamp = parseInt(date, 10);
      const dateString = new Date(timeStamp).toLocaleDateString("en-US");
      return dateString;
    };

    onMounted(async () => {
      await getBlogDetail();
    });

    return {
      blog,
      blogId,
      getBlogDetail,
      getDateString,
    };
  },
});
</script>
<style lang=""></style>
