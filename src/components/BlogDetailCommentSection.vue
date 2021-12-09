<template>
  <div>
    <n-divider title-placement="center"><h3>Comments</h3></n-divider>
  </div>
  <n-card v-if="showTextarea">
    <n-input type="textarea" maxlength="30" show-count />
  </n-card>
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { NDivider, NTimeline, NTimelineItem, NCard, NInput } from "naive-ui";
import { Comment } from "../type/comment";
import { fetchCommentsByBlogId } from "../api/index";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    NDivider,
    NTimeline,
    NTimelineItem,
    NCard,
    NInput,
  },
  props: {
    blogId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const comments = ref<Comment[]>([]);

    const showTextarea = ref(false)

    const store = useStore()
    const isLogin = computed(() => store.state.isLogin)


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

    watch(isLogin, (isLogin) => {
      if (isLogin) showTextarea.value = true
    })

    return {
      comments,
      getCommentByBlogId,
      getDateAndTime,
      showTextarea
    };
  },
});
</script>
<style lang=""></style>
