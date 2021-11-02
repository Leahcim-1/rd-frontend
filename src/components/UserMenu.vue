<template>
  <div id="user-menu">
    <div v-if="signedIn" id="user-menu-avatar-menu"></div>
    <div v-else id="user-menu-login">
      <n-button>
        <template #icon>
          <LogInFilled />
        </template>
        Login
      </n-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { NButton  } from "naive-ui";
import { LogInFilled } from '@vicons/material'

export default defineComponent({
  components: {
    NButton,
    LogInFilled,
  },
  setup() {
    const signedIn = ref(false);
    return {
      signedIn,
    };
  },
});
</script>
<style lang="scss">
#user-menu {
  width: 5.5rem;
  height: 4rem;
  position: fixed;
  top: 20px;
  right: 5rem;
  z-index: 10;
  text-align: center;
  display: flex;

  #user-menu-login {
    flex: 1;
    cursor: pointer;
    position: relative;

    .n-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
