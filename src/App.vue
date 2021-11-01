<template>
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '800' } }">
    <n-layout has-sider style="height: 100%">
      <n-layout-sider v-bind="siderProps">
        <sider />
      </n-layout-sider>
      <n-layout v-bind="contentProps">
        <router-view />
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script>
import { NLayout, NLayoutSider, NConfigProvider, darkTheme } from "naive-ui";
import { defineComponent } from "vue";
import Sider from "./components/Sider.vue";

const siderProps = {
  bordered: true,
  style: "height: 100%",
  "show-trigger": "true",
  "collapse-mode": "width",
  "collapsed-width": 30,
  width: "300",
  "native-scrollbar": false,
};

const contentProps = {
  style: "padding: 15px",
};

export default defineComponent({
  name: "App",
  components: {
    NLayout,
    NLayoutSider,
    Sider,
    NConfigProvider,
  },
  setup() {
    return {
      siderProps,
      contentProps,
      darkTheme,
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
}
</style>
