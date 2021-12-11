<template>
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '800' } }">
    <NMessageProvider>
      <user-menu />
      <n-layout has-sider style="height: 100%">
        <!-- Sider -->
        <n-layout-sider
          v-bind="siderProps"
          @expand="collapsed = false"
          @collapse="collapsed = true"
        >
          <sider :collapsed="collapsed" />
        </n-layout-sider>
        <!-- Content -->
        <n-layout v-bind="contentProps">
          <router-view />
        </n-layout>
      </n-layout>
    </NMessageProvider>
  </n-config-provider>
</template>

<script>
import {
  NLayout,
  NLayoutSider,
  NConfigProvider,
  NMessageProvider,
} from "naive-ui";
import { defineComponent, ref, onUnmounted, onUpdated } from "vue";
import UserMenu from "./components/UserMenu.vue";
import Sider from "./components/Sider.vue";

const siderProps = {
  bordered: true,
  style: "height: 100%",
  "show-trigger": "true",
  "collapse-mode": "width",
  "collapsed-width": 64,
  width: "300",
  "native-scrollbar": false,
};

const contentProps = {
  style: "padding: 15px",
  overflow: "hidden",
  width: "100%",
};

export default defineComponent({
  name: "App",
  components: {
    NLayout,
    NLayoutSider,
    Sider,
    NConfigProvider,
    UserMenu,
    NMessageProvider,
  },

  setup() {
    onUpdated(() => {
            console.log('updated')

    })
    onUnmounted(() => {
      console.log('hi')
    })
    return {
      siderProps,
      contentProps,
      collapsed: ref(false),
    };
  },
});
</script>

<style lang="scss">
html,
body,
#app,
.n-config-provider {
  height: 100%;
  font-size: 18px;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
</style>
