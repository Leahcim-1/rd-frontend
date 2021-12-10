<template>
  <div id="user-menu">
    <div v-if="!signedIn" id="sign-in-btn"></div>
    <div v-else>
      <n-dropdown :options="options" @select="selectHandler"> 
        <n-avatar
          round
          :src="userInfo.picture"
        />
      </n-dropdown>
    </div>
  </div>
</template>
<script lang="ts" >
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import signInBtn from "../assets/sign-btn.png";
import {  NAvatar, NDropdown, MenuOption } from "naive-ui";
import { fetchUserInfo } from "../api/index";
import { useStore } from 'vuex'

const LOGOUT_KEY = "logout"
const options: MenuOption[] = [
  {
    label: "Logout",
    key: LOGOUT_KEY,
  }
]

export default defineComponent({
  components: {
    NAvatar,
    NDropdown,

  },
  setup() {
    const signedIn = ref(false);

    const store = useStore()

    const isLogin = computed(() => store.state.isLogin)

    const userInfo = computed(() => store.state.userInfo)

    // const userSignIn = async () => {
    //   const res = await fetchUserInfo()
    //   print(res)
    // }

    onMounted(async () => {
      // await userSignIn()
    });

    watch(isLogin, () => {
      signedIn.value = isLogin.value
    })


    return {
      signedIn,
      signInBtn,
      userInfo,
      options,
      selectHandler(key: string) {
        if (key == LOGOUT_KEY)
        console.log('logout-ed')
      }
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
