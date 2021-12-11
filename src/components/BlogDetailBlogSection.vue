<template>
  <div class="blog-detail-blog-section" v-if="blog">
    <h1>{{ blog.title }}</h1>
    <h3>{{ blog.subtitle }}</h3>
    <p>By {{ blog.user_name }}</p>
    <p>{{ blog.body }}</p>
    <p>Published: {{ getDateString(blog.create_time) }}</p>
    <p>Last Updated By: {{ getDateString(blog.update_time) }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Blog } from "../type/blog";
import { fetchBlogDetail } from "../api/index";

export default defineComponent({
  props: {
    blogId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const blog = ref<Blog>();

    const getBlogDetail = async (config = {}) => {
      const res = await fetchBlogDetail<Blog>(props.blogId, config);
      console.log(res);
      if (res.data.length > 0) blog.value = res.data[0];
    };

    const getDateString = (date: string) => {
      const timeStamp = Date.parse(date);
      const dateString = new Date(timeStamp).toLocaleDateString("en-US");
      return dateString;
    };

    onMounted(async () => {
      await getBlogDetail();
    });

    return {
      blog,
      getBlogDetail,
      getDateString,
    };
  },
});
</script>
<style lang=""></style>
