<template>
  <div class="mask" v-if="calcutations.total > 0 && showCart"></div>
  <div class="cart">
    <div class="product" v-if="calcutations.total > 0 && showCart">
      <div class="product__header">
        <div class="product__header__all" @click="setCartItemsChecked(shopId)">
          <span
            class="product__header__icon iconfont"
            v-html="calcutations.allChecked ? '&#xe652;' : '&#xe6f7;'"
          ></span>
          全选
        </div>
        <div
          class="product__header__clear"
          @click="() => cleanCartProducts(shopId)"
        >
          清空购物车
        </div>
      </div>

      <div v-for="item in productList" :key="item._id" class="product__item">
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe652;' : '&#xe6f7;'"
          @click="changeCartItemCheck(shopId, item._id)"
        ></div>
        <div class="product__item__img">
          <img src="http://www.dell-lee.com/imgs/vue3/near.png" alt="123" />
        </div>
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
            @click="addItemToCart(shopId, item._id, item, -1)"
            >-</span
          >
          {{ item.count || 0 }}
          <span
            class="product__number__minus"
            @click="addItemToCart(shopId, item._id, item, 1)"
            >+</span
          >
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <div class="icon">
          <img
            class="check__icon__img"
            @click="handleCartShowChange"
            src="http://www.dell-lee.com/imgs/vue3/basket.png"
          />
          <div class="check__icon__tag">{{ calcutations.total }}</div>
        </div>
      </div>
      <div class="check__info">
        总计:<span class="check__info__price"
          >&yen;{{ calcutations.price }}</span
        >
      </div>
      <div class="check__btn">
        <!-- <router-link :to="{ name: 'OrderConfirmation' }">去结算</router-link> -->
        <template v-if="calcutations.price > 0">
          <router-link :to="{ path: `/orderConfirmation/${shopId}` }"
            >去结算</router-link
          ></template
        >
        <template v-else> 请选择商品 </template>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useCartEffetct } from "./commonCartEffect";
// 购物车（cart手推车）相关逻辑
const cartEffect = function (shopId) {
  const store = useStore();
  const { calcutations, productList, addItemToCart } = useCartEffetct(shopId);
  // const cartList =
  const changeCartItemCheck = function (shopId, productId) {
    // 为什么store不能在此处定义，ned (reading 'commit') at Proxy.changeCartItemChe
    // const store = useStore();

    store.commit("changeCheck", {
      shopId,
      productId,
    });
  };
  const cleanCartProducts = (shopId) => {
    store.commit("cleanCartProducts", { shopId });
  };
  const setCartItemsChecked = (shopId) => {
    store.commit("setCartItemsChecked", { shopId });
  };
  return {
    calcutations,
    productList,
    addItemToCart,
    changeCartItemCheck,
    cleanCartProducts,
    setCartItemsChecked,
  };
};
export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const showCart = ref(false);
    const handleCartShowChange = function (params) {
      showCart.value = !showCart.value;
    };
    const {
      calcutations,
      productList,
      addItemToCart,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsChecked,
    } = cartEffect(shopId);
    console.log(productList);
    return {
      calcutations,
      shopId,
      productList,
      addItemToCart,
      changeCartItemCheck,
      cleanCartProducts,
      setCartItemsChecked,
      showCart,
      handleCartShowChange,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/mixins.scss";
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background-color: #fff;
  &__header {
    display: flex;
    height: 5.2rem;
    border-bottom: 1px solid #f1f1f1;
    font-size: 1.4rem;
    color: #333;
    &__all {
      width: 6.4rem;
      // flex: 1;
      // text-align: right;
      margin-left: 1.8rem;
    }
    &__icon {
      color: #0091ff;
      font-size: 2rem;
    }
    &__clear {
      flex: 1;
      margin-right: 1.6rem;
      text-align: right;
    }
  }
  &__item {
    display: flex;
    padding: 1.2rem 1.6rem;
    margin: 0 1.6rem;
    border-bottom: 0.1rem solid #f1f1f1;
    &__checked {
      margin-right: 2rem;
      color: #0091ff;
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__detail {
      overflow: hidden;
    }

    &__img {
      margin-right: 1.6rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        width: 4.6rem;
        height: 4.6rem;
      }
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
      margin: 0.6rem 0 0 0;
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
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;
}
.check {
  display: flex;
  line-height: 4.9rem;
  height: 4.9rem;
  // border-top: 0.1rem solid #f1f1f1;
  &__icon {
    width: 8.4rem;
    position: relative;
    &__img {
      display: block;
      margin: 1.2rem auto;
      width: 2.8rem;
      height: 2.6rem;
    }
    &__tag {
      position: absolute;
      // right: 2rem;
      top: 0.4rem;
      left: 5rem;
      padding: 0 0.4rem;

      min-width: 2rem;
      height: 2rem;
      line-height: 2rem;
      background-color: #e93b3b;
      border-radius: 1rem;
      font-size: 1.2rem;
      text-align: center;
      color: #fff;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: #333;
    font-size: 1.2rem;
    &__price {
      color: #e93b3b;
      font-size: 1.8rem;
    }
  }
  &__btn {
    background-color: #4fb0f9;
    width: 9.8rem;
    a {
      color: #fff;
      text-decoration: none;
    }
    font-size: 1.4rem;
    text-align: center;
  }
}
</style>
