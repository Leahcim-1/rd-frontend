<template >
  <div>
    <n-menu id='sider-menu' :options="menus" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, h } from "vue";
import { RouterLink, RouterLinkProps } from "vue-router";
import routes from "../router/router-config";
import { NIcon, NMenu, MenuOption } from "naive-ui";

const menus: MenuOption[] = routes.map((route) => {

  const routeLinkProps: RouterLinkProps = {
    to: route.path,
  };

  return {
    label: () => h(RouterLink, routeLinkProps, { default: () => route.name }),
    key: route.name as string,
  };
});

export default defineComponent({
  name: "Sider",
  components: {
    NMenu,
  },
  setup() {
    return {
      menus,
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