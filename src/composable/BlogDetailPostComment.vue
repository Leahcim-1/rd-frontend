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
        <n-input type="textarea" maxlength="30" show-count />
        <n-button @click="postCommentHandler">Post</n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { NCard, NInput, NButton, NSpace } from "naive-ui";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    NCard,
    NInput,
    NButton,
    NSpace
  },
  setup() {
    const showTextarea = ref(false)
    const store = useStore()
    const isLogin = computed(() => store.state.isLogin)

    onMounted(() => {
      showTextarea.value = isLogin.value
    })

    watch(isLogin, (isLogin) => {
      showTextarea.value = isLogin
    })

    return {
      showTextarea,
      postCommentHandler() { return true }
    }

  }
})
</script>