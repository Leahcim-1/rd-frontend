<template>
  <n-space 
    id="sider-wrapper"
    :vertical="true"
  >
    <div 
      id="sider-logo-wrapper"
    >
      <n-image 
        id="sider-logo"
        :src="logoSrc"
        object-fit="contain"
        :img-props="imgStyle"
      />
    </div>

    <n-menu 
      id="sider-menu" 
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuRefs" 
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, h, watch, ref, computed } from "vue";
import { RouterLink, RouterLinkProps } from "vue-router";
import routes, { AUTH_ROUTES } from "../router/router-config";
import { NMenu, MenuOption, NImage, NSpace, NIcon } from "naive-ui";
import { useStore } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import logoSrc from "../assets/logo.png"
import { 
  HomeOutlined, 
  AccountCircleOutlined, 
  PostAddRound, 
  ContactSupportOutlined 
} from '@vicons/material'


export default defineComponent({
  name: "Sider",
  components: {
    NMenu,
    NImage,
    NSpace,
  },
  props: {
    collapsed: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    const store = useStore()

    const isLogin = computed(() => store.state.isLogin)

    const iconMapper = {
      "/": HomeOutlined,
      "/about": ContactSupportOutlined,
      "/postBlog": PostAddRound,
      "/admin": AccountCircleOutlined,
    }

    const renderIcon = (icon) => {
      return () => h(NIcon, null, { default: () => h(icon) })
    }

    const menuProcess = (route: RouteRecordRaw) => {
      const routeLinkProps: RouterLinkProps = {
        to: route.path,
      };

      let icon;
      if (route.path in iconMapper) 
        icon = iconMapper[route.path];

      return {
        label: () => h(RouterLink, routeLinkProps, { default: () => route.name }),
        key: route.name as string,
        icon: renderIcon(icon),
      };
    }

    const menus: MenuOption[] = routes.filter(route => !store.state.isLogin && !AUTH_ROUTES.includes(route.path))
                                      .filter(route => route.name)
                                      .map(menuProcess);
    const menuRefs = ref(menus)
    
    watch(isLogin, isLogin => {
      if (isLogin) menuRefs.value = routes.map(menuProcess);
    })

    return {
      menus,
      menuRefs,
      logoSrc,
      imgStyle: {
        display: "block",
      },
    };
  },
});
</script>

<style lang="scss">
#sider-menu {
  width: 100%;
}

#sider-logo-wrapper {
  width: 100%;

  #sider-logo {
    width: 100%;
    overflow: hidden;

    img {
      width: 100%;
      margin: 3rem;
    }
  }

  #sider-logo::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
}
</style>
