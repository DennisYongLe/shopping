import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    // 异步路由加载
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/Home"),
  },
  {
    path: "/cartList",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "cartList" */ "../views/home/CartList"),
  },
  {
    path: "/orderConfirmation/:id",
    name: "OrderConfirmation",
    component: () =>
      import(
        /* webpackChunkName: "orderConfirmation" */ "../views/orderConfirmation/OrderConfirmation"
      ),
  },
  {
    path: "/orderList",
    name: "Order",
    component: () =>
      import(
        /* webpackChunkName: "orderList" */ "../views/orderList/OrderList.vue"
      ),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/register/Register.vue"
      ),
  },
  {
    // 指的是路由在跳转的时候还要获取id
    path: "/shop/:id",
    name: "Shop",
    component: () =>
      import(/* webpackChunkName: "shop" */ "../views/shop/Shop.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue"),
    beforeEnter(to, from, next) {
      // if (localStorage.isLogin) {
      //   next({ name: "Home" });
      // } else {
      //   next();
      // }
      // 将上面四行代码进行简化
      const { isLogin } = localStorage;
      isLogin ? next({ name: "Home" }) : next();
    },
  },
  {
    path: "/orderCreation",
    name: "OrderCreation",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/register/Register.vue"
      ),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 无论什么路由都会执行
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.isLogin;
//   const { name } = to;
//   if (isLogin || name === "Login") {
//     if (isLogin && name === "Login") {
//       // 已登录状态不能进入登录页面
//       // next({ name: "Home" });
//       next();
//     } else {
//       // 未登录状态进入登录页面应放行
//       next();
//     }
//     // if (!(isLogin && name === "Login")) {
//     //   next();
//     // }
//     // next();
//   } else {
//     next({ name: "Login" });
//   }
// });
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin;
  const { name } = to;
  const isLoginOrRegister = name === "Login" || name === "Register";
  isLogin || isLoginOrRegister ? next() : next({ name: "Login" });
});
export default router;
