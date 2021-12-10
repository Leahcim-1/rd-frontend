<template>
  <div id="admin">
    <n-space
      :vertical="true"
    >
      <n-h1 prefix="bar" align-text type="success">
        <n-text type="success">Don't Mind the Gap</n-text>
      </n-h1>
      <user-blog-list-table />
      <user-comments-list-table />
    </n-space>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserBlogListTable from "../components/UserBlogListsTable.vue"
import UserCommentsListTable from "../components/UserCommentListTable.vue"
import { NSpace, NH1, NText } from 'naive-ui'

export default defineComponent({
  name: "admin",
  components: {
    UserBlogListTable,
    UserCommentsListTable,
    NSpace,
    NH1,
    NText,
  },
  setup() {
    return {

    }
  }
});
</script>
<style lang="scss">
  #admin {
    width: 100%;
    padding: 2rem;
    overflow: hidden;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
