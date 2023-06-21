<template>
  <div class="content">
    <div class="category">
      <div
        v-for="item in categories"
        :key="item.id"
        :class="{
          category__item: true,
          'category__item--active': item.tab === currentTab,
        }"
        @click="handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item._id">
        <img
          class="product__item__img"
          src="http://www.dell-lee.com/imgs/vue3/near.png"
          alt="123"
        />
        <div class="product__item__detail">
          <h4 class="product__item__title">
            {{ item.name }}
          </h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <!-- 原价 -->
            <span class="product__item__origin">{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="ItemToCart(shopId, item._id, item, -1, shopName[0].name)"
            >-</span
          >
          {{ getProductCartCount(shopId, item._id) }}
          <span
            class="product__number__minus"
            @click="ItemToCart(shopId, item._id, item, 1, shopName[0].name)"
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { get } from "../../utils/request";
import { useCartEffetct } from "./commonCartEffect";
import store from "@/store";

// 此处定义为常量
const categories = [
  { id: 1, name: "全部商品", tab: "all" },
  { id: 2, name: "秒杀", tab: "seckill" },
  { id: 3, name: "新鲜水果", tab: "fruit" },
];
// tab切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);

  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };
  return { handleTabClick, currentTab };
};
// 列表内容相关的逻辑
const contentDataEffect = (currentTab, shopId) => {
  const contentList = ref([]);
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });

    if (result?.errno === 0 && result?.data?.length) {
      contentList.value = result.data;
    }
  };
  watchEffect(() => {
    getContentData();
  });
  return { contentList, getContentData };
};
// 购物车相关逻辑
const useCartEffetcts = function () {
  const { cartList, addItemToCart } = useCartEffetct();
  const changeShopName = (shopId, shopName) => {
    store.commit("changeShopName", { shopId, shopName });
  };
  const ItemToCart = (shopId, productId, productInfo, number, shopName) => {
    addItemToCart(shopId, productId, productInfo, number);
    changeShopName(shopId, shopName);
  };
  const getProductCartCount = (shopId, productId) => {
    // ref值获取要进行.value

    return cartList?.[shopId]?.productList?.[productId]?.count || 0;
  };
  return { cartList, changeShopName, ItemToCart, getProductCartCount };
};
export default {
  name: "Content",
  props: ["shopName"],
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { handleTabClick, currentTab } = useTabEffect();
    const { contentList } = contentDataEffect(currentTab, shopId);

    const { cartList, changeShopName, ItemToCart, getProductCartCount } =
      useCartEffetcts();

    return {
      shopId,
      currentTab,
      contentList,
      categories,
      handleTabClick,
      cartList,
      ItemToCart,
      changeShopName,
      getProductCartCount,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 15rem;
  bottom: 5rem;
}
.category {
  // display: flex;
  // flex-direction: column;
  // gap: 5rem;
  overflow-y: scroll;
  width: 7.6rem;
  background: $search-bgColor;
  height: 100%;
  &__item {
    width: 100%;
    text-align: center;
    line-height: 4rem;
    font-size: 1.4rem;
    color: #333;
    &--active {
      background: #fff;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    display: flex;
    padding: 1.2rem 1.6rem;
    margin: 0 1.6rem;
    border-bottom: 0.1rem solid #f1f1f1;
    &__detail {
      overflow: hidden;
    }

    &__img {
      width: 6.8rem;
      height: 6.8rem;
      margin-right: 1.6rem;
    }
    &__title {
      line-height: 2rem;
      font-size: 1.4rem;
      color: #333;
      margin: 0;
      @include ellipsis;
    }
    &__sales {
      margin: 0.6rem 0;
      line-height: 1.6rem;
      font-size: 1.4rem;
      color: #333;
    }
    &__price {
      margin: 0;
      line-height: 1.6rem;
      font-size: 1.4rem;
      color: red;
    }
    &__yen {
      font-size: 1.2rem;
    }
    &__origin {
      margin-left: 0.6rem;
      line-height: 2rem;
      font-size: 1.2rem;
      color: #999;
      text-decoration: line-through;
    }
  }
  &__number {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 0.2rem;
  }
}
</style>
