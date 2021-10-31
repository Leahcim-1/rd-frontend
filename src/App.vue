<template>
  <n-layout has-sider style="height: 100%;">
    <n-layout-sider v-bind="siderProps">
      <sider />
    </n-layout-sider>
    <n-layout>
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script>
import { NLayout, NLayoutSider } from 'naive-ui';
import { defineComponent } from 'vue'
import Sider from './components/Sider.vue'

const siderProps = {
  bordered: true,
  style: "height: 100%",
  'show-trigger': 'true',
  'collapse-mode': "width",
  'collapsed-width': 30,
  width: '300',
  'native-scrollbar': false
}

export default defineComponent({
  name: 'App',
  components: {
    NLayout,
    NLayoutSider,
    Sider,
  },
  setup() {
    return {
      siderProps
    }
  }

})
</script>

<style lang="scss">
  html, body, #app {
    height: 100%;
  }

  
</style>
