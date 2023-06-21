<template>
  <div class="wrapper">
    <Staticpart />
    <Nearby />
  </div>
  <Docker :currentIndex="0" />
</template>
<script>
import Staticpart from "./StaticPart.vue";
import Nearby from "./Nearby.vue";
import Docker from "./Docker.vue";
export default {
  name: "Home",
  components: { Staticpart, Nearby, Docker },
};
</script>
<style lang="scss" scoped>
ul.b {
  color: red;
}
.wrapper {
  overflow-y: auto;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  top: 0;
  bottom: 6rem;
  padding: 0 1.8rem;
  left: 0;
  right: 0;
}

// .docker__item {
//   flex: 1;
//   text-align: center;
//   .iconfont {
//     font-size: 3rem;
//     margin: 0.7rem 0rem 0.2rem 0rem;
//   }
// }
// .docker__item--active {
//   color: red;
// }
// .docker__title {
//   // font-size: 2rem;
//   font-size: 16px;
//   // 当元素想设置成比font-size小的大小，需要借助transform
//   transform: scale(0.5, 0.5);
//   transform-origin: center top;
// }
</style>
