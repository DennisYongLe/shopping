<template>
  <Toast v-if="toastData.showToast" :toastMessage="toastData.toastMessage" />
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
    />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        v-model="data.phoneNumber"
        placeholder="请输入手机号"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        v-model="data.password1"
        autocomplete="new-password"
        placeholder="密码"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        v-model="data.password2"
        autocomplete="new-password"
        placeholder="确认密码"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">
      已有账号去登录
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { post } from "../../utils/request";
const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({
    password1: "",
    password2: "",
    phoneNumber: "",
  });
  const handleRegister = async function () {
    try {
      // 判断密码是否一致
      if (data.password1 !== data.password2) {
        showToast("输入密码不一致");
      }
      const result = await post("/api/user/register", {
        username: data.username,
        password: data.password1,
      });
      if (result?.errno === 0) {
        router.push({ name: "Home" });
      } else {
        showToast("注册失败");
      }
    } catch (e) {
      console.log(e);
      showToast("请求失败");
    }
  };
  return { data, handleRegister };
};
const handleLoginClickEffect = function () {
  const router = useRouter();
  const handleLoginClick = function () {
    router.push({ name: "Login" });
  };
  return { handleLoginClick };
};
export default {
  name: "register",
  components: { Toast },
  setup() {
    const { toastData, showToast } = useToastEffect();
    const { handleLoginClick } = handleLoginClickEffect();
    const { data, handleRegister } = useRegisterEffect(showToast);
    return { handleLoginClick, data, toastData, handleRegister };
  },
};
</script>
<style scoped lang="scss">
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__img {
    display: block;
    margin: 0 auto 4rem auto;
    width: 6.6rem;
    height: 6.6rem;
  }
  &__input {
    padding: 0 1.5rem;
    width: 25.9rem;
    height: 4.8rem;
    margin: 0 4rem 1.6rem 4rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    &__content {
      line-height: 4.8rem;
      box-sizing: border-box;
      width: 100%;
      background: none;
      outline: none;
      border: none;
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  &__register-button {
    background: #0091ff;
    box-shadow: 0 0.4rem 0.8rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.4rem;
    color: #f9f9f9;
    margin: 3.2rem 4rem 0 4rem;
    line-height: 4.8rem;
    font-size: 1.6rem;
    width: 25.9rem;
    text-align: center;
  }
  &__register-link {
    margin: 1.6rem 0;
    font-size: 1.4rem;
    color: #0091ff;
    text-align: center;
  }
}
</style>
