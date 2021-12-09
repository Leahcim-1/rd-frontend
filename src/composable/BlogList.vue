<template>
  <div
    class="bloglist-card-wrapper"
    v-for="blog in blogs"
    :key="blog.id"
    @click="() => goToDetail(blog.id)"
  >
    <n-card :bordered="false" hoverable embedded size="huge">
      <template #header
        ><h2 style="margin: 0px">{{ blog.title }}</h2></template
      >
      <template #header-extra>By {{ blog.user_name }}</template>
      <n-h4 prefix="bar">{{ blog.subtitle }}</n-h4>
      <n-ellipsis>{{ blog.body }}</n-ellipsis>
      <template #footer>
        Published: {{ getDateString(blog.create_time) }} | Updated:
        {{ getDateString(blog.update_time) }}
      </template>
    </n-card>
    <n-divider width="600"></n-divider>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { NCard, NEllipsis, NDivider, NH2, NH4 } from "naive-ui";
import { Blog } from "../type/blog";
import { fetchBlogLists } from "../api/index";

export default defineComponent({
  name: "BlogList",

  components: {
    NCard,
    NEllipsis,
    NDivider,
    NH4,
  },

  setup() {
    const blogs = ref<Blog[]>([]);
    const router = useRouter();

    const goToDetail = (id: string) => {
      router.push({
        path: `/blog/${id}`,
      });
    };

    const getBlogLists = async (config = {}) => {
      const res = await fetchBlogLists<Blog>(config);
      blogs.value = res.data;
    };

    const getDateString = (date: string) => {
      const timeStamp = Date.parse(date);
      const dateString = new Date(timeStamp).toLocaleDateString("en-US");
      return dateString;
    };

    onMounted(async () => {
      await getBlogLists();
    });

    return {
      blogs,
      getBlogLists,
      goToDetail,
      getDateString,
    };
  },
});
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
