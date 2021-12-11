<template>
  <div>
    <n-divider title-placement="center"><h3>Comments</h3></n-divider>
    <blog-detail-post-comment :blogId="id"/>
    <blog-detail-comments-list :blogId="id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NDivider } from "naive-ui";
import BlogDetailPostComment from '../composable/BlogDetailPostComment.vue'
import BlogDetailCommentsList from '../composable/BlogDetailCommentsList.vue'


export default defineComponent({
  components: {
    NDivider,
    BlogDetailPostComment,
    BlogDetailCommentsList
  },
  props: {
    blogId: {
      type: String,
      required: true,
    },
  },
  setup(props) {

    const getDateAndTime = (timestamp: string) => {
      const datetime = new Date(parseInt(timestamp, 10));
      const time = datetime.toLocaleTimeString();
      const date = datetime.toLocaleDateString();
      return `${date} ${time}`;
    };
    

    return {
      getDateAndTime,
      id: ref(props.blogId)
    };
  },
});
</script>
<style lang=""></style>
