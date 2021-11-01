<template>
  <div class="home">
    <home-header />
    <blog-content />
  </div>
</template>

<script lang="ts">
import HomeHeader from "../components/HomeHeader.vue";
import { defineComponent } from "vue";
import BlogContent from "../components/BlogContent.vue";

export default defineComponent({
  name: "Home",
  components: {
    HomeHeader,
    BlogContent,
  },
});
</script>
