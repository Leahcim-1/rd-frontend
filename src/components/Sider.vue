<template>
  <div>
    <n-menu 
      id="sider-menu" 
      :options="menuRefs" 
      :key=key
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, h, watch, ref, computed, watchEffect } from "vue";
import { RouterLink, RouterLinkProps } from "vue-router";
import routes from "../router/router-config";
import { NMenu, MenuOption } from "naive-ui";
import { useStore } from 'vuex'
import { RouteRecordRaw } from 'vue-router'


export default defineComponent({
  name: "Sider",
  components: {
    NMenu,
  },
  setup() {
    const store = useStore()

    const isLogin = computed(() => store.state.isLogin)

    const menuProcess = (route: RouteRecordRaw) => {
      const routeLinkProps: RouterLinkProps = {
        to: route.path,
      };

      return {
        label: () => h(RouterLink, routeLinkProps, { default: () => route.name }),
        key: route.name as string,
      };
    }

    const menus: MenuOption[] = routes.filter(route => !store.state.isLogin && route.name != 'Post Blog')
                                      .map(menuProcess);
    const menuRefs = ref(menus)
    
    watch(isLogin, isLogin => {
      if (isLogin) menuRefs.value = routes.map(menuProcess);
    })

    return {
      menus,
      menuRefs,
    };
  },
});
</script>

<style lang="scss">
#sider-menu {
  position: absolute;
  top: 40%;
  left: 0%;
  width: 100%;
  transform: translate(0%, -70%);
}
</style>
