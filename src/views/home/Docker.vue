<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{
        docker__item: true,
        'docker__item--active': index === currentIndex,
      }"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">
          {{ item.text }}
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Docker",
  props: ["currentIndex"],
  setup() {
    const dockerList = [
      { icon: "&#xe6af;", text: "首页", to: { name: "Home" } },
      // { icon: "&#xe6af;", text: "购物车", to: { name: "Cart" } },
      { icon: "&#xe6af;", text: "订单", to: { name: "Order" } },
      { icon: "&#xe6af;", text: "我的", to: { name: "Home" } },
    ];
    return {
      dockerList,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";
.docker {
  position: fixed;
  color: $content-fontcolor;
  padding: 0 1.8rem;
  display: flex;
  // position: absolute;
  width: 100%;
  height: 6rem;
  bottom: 0;
  border-top: 1px solid $content-bgcolor;
  // attention
  box-sizing: border-box;
  &__item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      color: black;
    }
    .iconfont {
      font-size: 3rem;
      margin: 0.7rem 0rem 0.2rem 0rem;
    }
    &--active {
      a {
        color: red;
      }
    }
  }
  &__title {
    // font-size: 2rem;
    font-size: 16px;
    // 当元素想设置成比font-size小的大小，需要借助transform
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
