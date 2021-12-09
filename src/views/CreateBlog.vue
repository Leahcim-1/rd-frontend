<template>
  <div class="create-blog">
    <create-blog-form class="create-blog-wrapper" />
  </div>
</template>

<script lang="ts">
import createBlogForm from "../components/CreateBlogForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateBlog",
  components: {
    createBlogForm,
  },
});
</script>

<style lang="scss">
.create-blog {
  height: 100%;
  position: relative;

  .create-blog-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 640px;
  }
}
</style>
