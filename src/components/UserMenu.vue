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
import {  NAvatar, NDropdown, MenuOption, useMessage } from "naive-ui";
import { checkLogin } from "../api/index";
import { useStore } from 'vuex'
import { useRouter } from "vue-router";

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
    const store = useStore()
    const message = useMessage();
    const router = useRouter();

    const isLogin = computed(() => store.state.isLogin)

    const userInfo = computed(() => store.state.userInfo)

    const signedIn = ref(false);


    const handleCredentialResponse = async (response: any) => {
      console.log("Encoded JWT ID token: " + response!.credential);
      const isValid = await checkLogin({
        headers: {
          "Content-Type": "text/plain"
        },
        data: {
          token: response.credential
        }
      })

      if (isValid) {
        message.success("Login Successfully!")
        store.commit('parseToken', response.credential)
        store.commit("login");
        signedIn.value = isLogin.value
      } else {
        message.error("Login Failed")
        router.replace("/")
      }
    };

    const loadGoogle = () => {
      // eslint-disable-next-line
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id:
          "869629692788-45qf48a9i2t88hdhjiei336msfm12sov.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      // eslint-disable-next-line
      // @ts-ignore
      window.google.accounts.id.renderButton(
        document.getElementById("sign-in-btn"),
        { theme: "outline", size: "large" } // customization attributes
      );

      // eslint-disable-next-line
      // @ts-ignore
      window.google.accounts.id.prompt(); // also display the One Tap dialog
    };

    onMounted(() => {
      loadGoogle();
    });


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
  right: 2rem;
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
