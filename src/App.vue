<template>
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '800' } }">
    <user-menu />
    <n-layout has-sider style="height: 100%">
      <n-layout-sider 
        v-bind="siderProps"
        @expand="collapsed = false"
        @collapse="collapsed = true"
      >
        <sider :collapsed="collapsed" />
      </n-layout-sider>
      <n-layout v-bind="contentProps">
        <router-view />
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script>
import { NLayout, NLayoutSider, NConfigProvider, darkTheme } from "naive-ui";
import { defineComponent, on, onMounted, onUpdated, ref } from "vue";
import { useStore } from 'vuex'
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
  width: "100%"
};

export default defineComponent({
  name: "App",
  components: {
    NLayout,
    NLayoutSider,
    Sider,
    NConfigProvider,
    UserMenu,
  },

  setup() {
    const store = useStore()

    const handleCredentialResponse = (response) => {
      console.log("Encoded JWT ID token: " + response.credential);
      store.commit('login')
    }

    const loadGoogle = () => {
      window.google.accounts.id.initialize({
        client_id: "869629692788-45qf48a9i2t88hdhjiei336msfm12sov.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
        document.getElementById("sign-in-btn"),
        { theme: "outline", size: "large" }  // customization attributes
      );

      window.google.accounts.id.prompt(); // also display the One Tap dialog
    }

    onMounted(() => {
      loadGoogle()
    })

    onUpdated(() => {
      if (!store.state.isLogin) loadGoogle()
    })
    
    return {
      siderProps,
      contentProps,
      darkTheme,
      collapsed: ref(false)
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
