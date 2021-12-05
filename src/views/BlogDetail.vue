<template>
  <div id="blog-detail-wrapper">
    <back-arrow :size="24" />
    <blog-section :blogId="blogId" />
    <comment-section :blogId="blogId" />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import BackArrow from "../composable/BackwardArrow.vue";
import BlogSection from "../components/BlogDetailBlogSection.vue";
import CommentSection from "../components/BlogDetailCommentSection.vue";

export default defineComponent({
  components: {
    BackArrow,
    BlogSection,
    CommentSection,
  },
  setup() {
    const route = useRoute();
    const blogId = computed(() => route.params.id);
    return {
      blogId,
    };
  },
});
</script>
<style lang="scss">
#blog-detail-wrapper {
  padding: 36px;
}
</style>
