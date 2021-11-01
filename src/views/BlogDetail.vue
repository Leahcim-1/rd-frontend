<template>
  <back-arrow :size="24" />
  <blog-section />
  <comment-section />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BackArrow from "../composable/BackwardArrow.vue";
import BlogSection from "../components/BlogDetailBlogSection.vue";
import CommentSection from "../components/BlogDetailCommentSection.vue";

export default defineComponent({
  components: {
    BackArrow,
    BlogSection,
    CommentSection,
  },
});
</script>
<style lang="scss">
#blog-detail-wrapper {
  padding: 36px;
}
</style>
