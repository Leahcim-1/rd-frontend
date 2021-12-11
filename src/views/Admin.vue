<template>
  <div id="admin">
    <n-space :vertical="true">
      <n-layout>
        <n-layout-header>
          <n-h1 prefix="bar" align-text type="success">
            <n-text type="success">Don't Mind the Gap</n-text>
          </n-h1>
        </n-layout-header>
        <n-layout-content>
          <user-blog-list-table />
          <!-- <user-comments-list-table /> -->
        </n-layout-content>
      </n-layout>
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserBlogListTable from "../components/UserBlogListsTable.vue";
import UserCommentsListTable from "../components/UserCommentListTable.vue";
import {
  NSpace,
  NH1,
  NText,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
} from "naive-ui";

export default defineComponent({
  name: "admin",
  components: {
    UserBlogListTable,
    // UserCommentsListTable,
    NSpace,
    NH1,
    NText,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
#admin {
  width: 100%;
  padding: 2rem;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
