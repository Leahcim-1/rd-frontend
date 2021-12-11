<template>
  <div id="blog-detail-post-comment-wrapper">
    <n-card
      id="blog-detail-post-comment-content"
      v-if="showTextarea"
      title="Response In Action"
    >
      <n-space
        :vertical="true"
      >
        <n-input type="textarea" maxlength="30" show-count v-model:value="body" />
        <n-button @click="postCommentHandler">Post</n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { NCard, NInput, NButton, NSpace, useMessage } from "naive-ui";
import { useStore } from "vuex";
import { AxiosRequestConfig } from "axios";
import { postComments } from '../api/index';
import { Comment } from '../type/comment'
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    NCard,
    NInput,
    NButton,
    NSpace
  },
  props: {
    blogId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const showTextarea = ref(false)
    const body = ref("")
    const store = useStore()
    const isLogin = computed(() => store.state.isLogin)
    const message = useMessage()
    const router = useRouter()

    const postCommentHandler = async (config: AxiosRequestConfig) => {
      await postComments<Partial<Comment>>(
        {
          blog_id: props.blogId,
          user_id: store.state.userInfo.id,
          user_name: store.state.userInfo.name,
          body: body.value
        },
        config,
      )
      message.success("Comments posted!")
      router.go(0)
    }

    onMounted(() => {
      showTextarea.value = isLogin.value
    })

    watch(isLogin, (isLogin) => {
      showTextarea.value = isLogin
    })

    return {
      showTextarea,
      postCommentHandler,
      body,
    }

  }
})
</script>