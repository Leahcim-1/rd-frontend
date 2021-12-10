<template>
  <n-spin :show="loading" size="large" :key="loading">
    <list-table :columns="columns" :lists="blogs" />
  </n-spin>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  h,
} from "vue";
import { useRouter } from "vue-router";
import { NDivider, NH2, NSpin, NTag, DataTableColumns } from "naive-ui";
import { Blog } from "../type/blog";
import { fetchBlogLists } from "../api/index";
import { useStore } from "vuex";
import ListTable from "../composable/ListsTable.vue";
import ActionDropDownMenu from "../composable/ActionDropDownMenu.vue";

const columns: DataTableColumns = [
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
    render(row) {
      return h(
        // eslint-disable-next-line
        // @ts-ignore
        ActionDropDownMenu,
        {
          size: "small",
          rowEdit: () => {
            console.log("edit", row.id);
          },
          rowDelete: () => {
            console.log("delete", row.id);
          },
        }
      );
    },
  },
];

export default defineComponent({
  name: "BlogList",

  components: {
    NSpin,
    ListTable,
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

    const limit = computed(() => store.state.pagination.limit);
    const offset = computed(() => store.state.pagination.offset);

    const getBlogLists = async (config = {}) => {
      const res = await fetchBlogLists<Blog>(config);
      blogs.value = res.data;
    };

    const getDateString = (date: string) => {
      const timeStamp = Date.parse(date);
      const dateString = new Date(timeStamp).toLocaleDateString("en-US");
      return dateString;
    };

    const updateAction = () => {
      blogs.value.map;
    };

    onMounted(async () => {
      const params = {
        limit: limit.value,
        offset: offset.value,
      };
      await getBlogLists({ params });
    });

    watch([limit, offset], async ([newLimit, newOffset]) => {
      const params = {
        limit: limit.value,
        offset: offset.value,
      };
      await getBlogLists({ params });
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
