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
        v-model="username"
        placeholder="账号"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";

// 处理登录逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({
    mobile: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      if (data.mobile === data.password && data.mobile === "") {
        showToast("不能为空");
      }
      const result = await post("/api/user/login", {
        username: data.mobile,
        password: data.password,
      });
      if (result?.errno === 0) {
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        showToast("登录失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};
const handleRegisterClickEffect = () => {
  const router = useRouter();
  const handleRegisterClick = function () {
    router.push({ name: "Register" });
  };
  return { handleRegisterClick };
};
export default {
  name: "login",
  components: { Toast },

  setup() {
    const { toastData, showToast } = useToastEffect();

    const { username, password, handleLogin } = useLoginEffect(showToast);
    const { handleRegisterClick } = handleRegisterClickEffect();
    // try {
    //   const result = await post("/api/user/login", {
    //     username: data.mobile,
    //     password: data.password,
    //   });
    //   console.log(result);
    //   if (result?.errno === 0) {
    //     localStorage.isLogin = true;
    //     router.push({ name: "Home" });
    //   } else {
    //     alert("登录失败");
    //   }
    // } catch (e) {
    //   console.log(e);
    //   alert("请求失败");
    // }

    return { handleLogin, handleRegisterClick, username, password, toastData };
  },
};
// const handleLogin = () => {
//   axios
//     .post(
//       "https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/login",
//       {
//         username: data.mobile,
//         password: data.password,
//       }
//     )
//     .then(() => {
//       localStorage.isLogin = true;
//       router.push({ name: "Home" });
//     })
//     .catch(() => {
//       alert("失败");
//     });
// };
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
  &__login-button {
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
  &__login-link {
    margin: 1.6rem 0;
    font-size: 1.4rem;
    color: #0091ff;
    text-align: center;
  }
}
</style>
