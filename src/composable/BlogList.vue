<template>
  <n-spin
    :show="loading"
    size="large"
    :key="loading"
  >
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
  </n-spin>
</template>
<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { NCard, NEllipsis, NDivider, NH4, NSpin } from "naive-ui";
import { Blog } from "../type/blog";
import { fetchBlogLists } from "../api/index";
import { useStore } from "vuex";

export default defineComponent({
  name: "BlogList",

  components: {
    NCard,
    NEllipsis,
    NDivider,
    NH4,
    NSpin
  },

  setup() {
    const blogs = ref<Blog[]>([]);
    const router = useRouter();
    const store = useStore();

    const loading = ref(false);

    const goToDetail = (id: string) => {
      router.push({
        path: `/blog/${id}`,
      });
    };

    const limit = computed(() => store.state.pagination.limit)
    const offset = computed(() => store.state.pagination.offset)

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
      const params = {
        limit: limit.value,
        offset: offset.value,
      }
      loading.value = true;
      await getBlogLists({ params });
      loading.value = false;
      console.log(loading.value)

    });

    watch([limit, offset], async ([newLimit, newOffset]) => {
      const params = {
        limit: limit.value,
        offset: offset.value,
      }
      loading.value = true;
      await getBlogLists({ params });
      loading.value = false;
    })

    return {
      blogs,
      loading,
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
