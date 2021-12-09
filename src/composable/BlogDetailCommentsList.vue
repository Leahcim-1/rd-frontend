<template>
  <div id="blog-detail-comments-list-wrapper">
    <n-timeline :icon-size="20">
      <n-timeline-item
        v-for="comment in comments"
        :key="comment.id"
        type="info"
        :title="comment.user_name"
        :content="comment.body"
        :time="getDateAndTime(comment.created_time)"
      ></n-timeline-item>
    </n-timeline>
    <n-timeline :icon-size="20">
      <n-timeline-item
        v-for="comment in comments"
        :key="comment.id"
        type="info"
        :title="comment.user_name"
        :content="comment.body"
        :time="getDateAndTime(comment.created_time)"
      ></n-timeline-item>
    </n-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted} from "vue";
import { NTimeline, NTimelineItem, } from "naive-ui";
import { Comment } from "../type/comment";
import { fetchCommentsByBlogId } from "../api/index";

export default defineComponent({
  components: {
    NTimeline,
    NTimelineItem,
  },
  props: {
    blogId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const comments = ref<Comment[]>([]);

    const getCommentByBlogId = async (config = {}) => {
      const res = await fetchCommentsByBlogId<Comment>(props.blogId, config);
      if (res.data.length > 0) comments.value = res.data;
    };

    const getDateAndTime = (timestamp: string) => {
      const datetime = new Date(parseInt(timestamp, 10));
      const time = datetime.toLocaleTimeString();
      const date = datetime.toLocaleDateString();
      return `${date} ${time}`;
    };

    onMounted(async () => {
      await getCommentByBlogId();
    });

    return {
      comments,
      getCommentByBlogId,
      getDateAndTime,
    };
  },
});
</script>
<style lang=""></style>


