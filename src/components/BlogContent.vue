<template>
  <div id="blog-content-list">
    <blog-list />
    <pagination />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BlogList from "../composable/BlogList.vue";
import Pagination from "../composable/Pagination.vue"

export default defineComponent({
  components: {
    BlogList,
    Pagination,
  },
});
</script>
<style lang=""></style>
