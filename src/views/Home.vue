<template>
  <div class="home">
    <home-header />
  </div>
</template>

<script lang="ts">
import HomeHeader from '../components/HomeHeader.vue'
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    HomeHeader
  }
});
</script>
