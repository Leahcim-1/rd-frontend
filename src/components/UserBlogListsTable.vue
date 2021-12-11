<template>
  <n-spin :show="loading" size="large" :key="loading">
    <n-h2>User's Blog</n-h2>
    <list-table :columns="columns" :lists="blogs" />
  </n-spin>
  <n-divider />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, h } from "vue";
import { useRouter } from "vue-router";
import {
  NDivider,
  NH2,
  NSpin,
  NTag,
  DataTableColumns,
  useMessage,
} from "naive-ui";
import { Blog } from "../type/blog";
import { fetchBlogListsByUserId, deleteBlogById } from "../api/index";
import { useStore } from "vuex";
import ListTable from "../composable/ListsTable.vue";
import ActionDropDownMenu from "../composable/ActionDropDownMenu.vue";
import { AxiosRequestConfig } from "axios";

export default defineComponent({
  name: "BlogList",

  components: {
    NSpin,
    ListTable,
    NH2,
    NDivider,
  },

  setup() {
    const blogs = ref<Blog[]>([]);
    const loading = ref(false);
    const pagination = ref({
      limit: 10,
      offset: 0,
    });
    const router = useRouter();
    const message = useMessage();
    const store = useStore();

    const columns: DataTableColumns = [
      {
        title: "ID",
        key: "id",
      },
      {
        title: "Title",
        key: "title",
      },
      {
        title: "Subtitle",
        key: "subtitle",
      },
      {
        title: "Tag",
        key: "tag",
        render(row) {
          return h(
            NTag,
            {
              style: {
                marginRight: "6px",
              },
              type: "info",
            },
            {
              default: () => row.tag,
            }
          );
        },
      },
      {
        key: "create_time",
        title: "Created Time",
      },
      {
        key: "update_time",
        title: "Updated Time",
      },
      {
        title: "Action",
        key: "actions",
        render(row: any) {
          return h(
            // eslint-disable-next-line
            // @ts-ignore
            ActionDropDownMenu,
            {
              rowEdit: async () => {
                console.log("edit", row.id);
              },
              rowDelete: async () => {
                console.log("delete", row.id);
                await deleteBlogById(row!.id);
                message.success("Delete Post Successfully");
                await getBlogLists({
                  params: {
                    limit: pagination.value.limit,
                    offset: pagination.value.offset,
                  },
                });
              },
            }
          );
        },
      },
    ];

    const goToDetail = (id: string) => {
      router.push({
        path: `/blog/${id}`,
      });
    };

    const getBlogLists = async (config: AxiosRequestConfig = {}) => {
      const res = await fetchBlogListsByUserId<Blog>(
        store.state.userInfo.id,
        config
      );
      console.log(res);
      blogs.value = res.data;
    };


    const getDateString = (date: string) => {
      const timeStamp = Date.parse(date);
      const dateString = new Date(timeStamp).toLocaleDateString("en-US");
      return dateString;
    };

    onMounted(async () => {
      await getBlogLists({
        params: {
          limit: pagination.value.limit,
          offset: pagination.value.offset,
        },
      });
    });

    return {
      blogs,
      loading,
      getBlogLists,
      goToDetail,
      getDateString,
      columns,
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
