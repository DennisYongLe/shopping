<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe662;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xeb67;</span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>

    <ShopInfo :nearbyList="nearbyList" :hideBorder="true" />
    <Content :shopName="nearbyList" />
    <Cart />
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";
import Content from "./Content.vue";
import Cart from "./Cart.vue";
// 获取当前商铺信息
const useShopInfoEffect = function () {
  const route = useRoute();
  const data = reactive({
    nearbyList: [],
  });
  const getItemData = (async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.nearbyList.push(result.data);
    }
  })();
  return { data, getItemData };
};
// 点击回退逻辑
const useBackRouterEffect = function () {
  const router = useRouter();

  const handleBackClick = function () {
    router.back();
  };
  return { handleBackClick };
};
export default {
  name: "Shop",

  components: { ShopInfo, Content, Cart },
  setup() {
    const { data, getItemData } = useShopInfoEffect();
    const { handleBackClick } = useBackRouterEffect();
    const { nearbyList } = toRefs(data);
    return { nearbyList, handleBackClick, getItemData };
  },
};
</script>
<style scoped lang="scss">
.wrapper {
  padding: 0 1.8rem;
}
.search {
  display: flex;
  margin: 1.6rem 0;
  gap: 0.5rem;
  &__back {
    background: #f5f5f5;
    height: 3.2rem;
    font-size: 2.4rem;
    width: 3rem;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__content {
    flex: 1;
    background: #f5f5f5;
    border-radius: 1.6rem;
    display: flex;
    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4.4rem;
      font-size: 2rem;
    }
    &__input {
      box-sizing: border-box;
      border: none;
      color: #333;
      height: 3.2rem;
      flex: 1;
      font-size: 1.4rem;
      background: none;
      &::placeholder {
        color: #333;
      }
    }
  }
}
</style>
