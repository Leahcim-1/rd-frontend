<template>
  <div id="user-menu">
    <div id="sign-in-btn"></div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import signInBtn from "../assets/sign-btn.png";
import { NButton, NAvatar } from "naive-ui";
import { fetchUserInfo } from "../api/index";

export default defineComponent({
  components: {},
  setup() {
    const signedIn = ref(false);

    // const userSignIn = async () => {
    //   const res = await fetchUserInfo()
    //   print(res)
    // }

    onMounted(async () => {
      // await userSignIn()
    });

    return {
      signedIn,
      signInBtn,
    };
  },
});
</script>
<style lang="scss">
#user-menu {
  position: fixed;
  top: 2rem;
  right: 5rem;
  z-index: 10;
  text-align: center;
  display: flex;

  #sign-in-btn {
    flex: 1;
  }

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
