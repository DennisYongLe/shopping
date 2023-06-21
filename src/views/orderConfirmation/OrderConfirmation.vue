<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back" @click="back">&#xe6db;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">收货地址</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">123</span>
          <span class="top__receiver__info__phone">123</span>
          <span></span>
        </div>
        <div class="iconfont top__receiver__icon">&#xe6db;</div>
      </div>
    </div>
    <div class="product">
      <div class="product__wrapper">
        <div class="product__list">
          <div class="product__title">{{ shopName }}</div>
          <template v-for="item in productList" :key="item.id">
            <div v-if="item.count > 0" class="product__item">
              <img class="product__item__img" :src="item.imgUrl" alt="123" />
              <div class="product__item__detail">
                <h4 class="product__item__title">{{ item.name }}</h4>
                <p class="product__item__price">
                  <span class="product__item__singleprice">
                    <span class="product__item__yen"
                      >&yen;{{ item.price }}*{{ item.count }}</span
                    ></span
                  >
                  <span class="product__item__totalprice">
                    <span class="product__item__yen"
                      >&yen;{{ item.price * item.count }}</span
                    ></span
                  >
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="order__price">
        实付金额<b>&yen;{{ calcutations.price }}</b>
      </div>
      <div class="order__btn" @click="changeshowmask">提交订单</div>
    </div>
    <div class="mask" v-if="showmask">
      <div class="mask__content">
        <div class="mask__content__title">确认离开收银台？</div>
        <div class="mask__content__desc">请尽快完成支付</div>
        <div class="mask__content__btns">
          <div
            class="mask__content__btn mask__content__btn--first"
            @click="handleConfirm(true)"
          >
            取消订单
          </div>
          <div
            class="mask__content__btn mask__content__btn--last"
            @click="handleConfirm(false)"
          >
            确认支付
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { useCartEffetct } from "../shop/commonCartEffect";
import { post } from "../../utils/request";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  name: "orderConfirmation",
  setup() {
    const showmask = ref(false);
    const store = useStore();
    const router = useRouter();
    const back = function () {
      router.back();
    };
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName, calcutations } = useCartEffetct(shopId);
    const changeshowmask = function () {
      showmask.value = true;
    };
    const handleConfirm = async (isCanceled) => {
      const products = [];
      for (let i in productList.value) {
        const product = productList.value[i];
        products.push({ id: parseInt(product._id, 10), num: product.count });
      }
      // console.log(products);

      try {
        const result = await post("/api/order", {
          addressId: 1,
          shopId,
          shopName: shopName.value,
          isCanceled,
          products,
        });

        if (result?.errno === 0) {
          store.commit("clearCartData", { shopId });
          router.push({ name: "Home" });
        }
      } catch (e) {
        console.log(e);
      }
    };
    return {
      back,
      handleConfirm,
      productList,
      shopName,
      calcutations,
      showmask,
      changeshowmask,
    };
  },
};
</script>
<style scoped lang="scss">
@import "../../style/variables";
@import "../../style/mixins.scss";
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
  .top {
    position: relative;
    height: 19.6rem;
    background-size: 100% 15.9rem;

    background-image: linear-gradient(
      0deg,
      rgba(253, 248, 247, 0) 4%,
      #0091ff 50%
    );
    background-repeat: no-repeat;
    &__header {
      position: relative;
      padding-top: 4rem;
      line-height: 2.4rem;
      color: #fff;
      text-align: center;
      font-size: 1.6rem;
      &__back {
        position: absolute;
        left: 1.8rem;
        font-size: 2.2rem;
      }
    }
    &__receiver {
      position: absolute;
      left: 1.8rem;
      right: 1.8rem;
      bottom: 0;
      height: 11.1rem;
      background: #fff;
      border-radius: 0.4rem;
      &__title {
        line-height: 2.2rem;
        padding: 1.6rem 0 1.4rem 1.6rem;
        font-size: 1.6rem;
        color: #333;
      }
      &__address {
        line-height: 2rem;
        padding: 0 4rem 0 1.6rem;
        font-size: 1.4rem;
        color: #333;
      }
      &__info {
        padding: 0.6rem 0 0 1.6rem;
        &__name {
          margin-right: 0.6rem;
          line-height: 1.8rem;
          font-size: 1.2rem;
          color: #666;
        }
      }
      &__icon {
        transform: rotate(180deg);
        position: absolute;
        right: 1.6rem;
        top: 5rem;
        font-size: 2rem;
        color: #666;
      }
    }
  }

  .product {
    margin: 1.6rem 1.8rem 0 1.8rem;
    background: #fff;
    &__wrapper {
      position: absolute;
      margin: 0 1.6rem;
      left: 0;
      right: 0;
      bottom: 6rem;
      top: 22rem;
      overflow-y: scroll;
    }
    &__title {
      background: #fff;
      font-size: 1.6rem;
      color: #333;
      padding: 1.6rem 1.6rem 0 1.6rem;
      margin: 0 1.6rem;
    }
    &__list {
      background: #fff;
      padding-bottom: 1.6rem;
    }

    &__item {
      padding: 1.6rem;
      position: relative;
      display: flex;
      margin: 0 1.6rem;
      overflow-y: scroll;
      &__img {
        width: 4.6rem;
        height: 4.6rem;
        margin-right: 1.6rem;
      }
      &__detail {
        flex: 1;
        overflow: hidden;
      }

      &__title {
        line-height: 2rem;
        font-size: 1.4rem;
        color: #333;
        margin: 0;
        @include ellipsis;
      }

      &__price {
        display: flex;
        margin: 0;
        line-height: 1.6rem;
        margin: 0.6rem 0 0 0;
        font-size: 1.4rem;
        color: red;
      }

      &__totalprice {
        text-align: right;
        flex: 1;
        color: #000;
      }
      &__yen {
        font-size: 1.2rem;
      }
    }
  }
}
.order {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 4.9rem;
  line-height: 4.9rem;
  background: #fff;
  &__price {
    flex: 1;
    padding-left: 2.4rem;
    font-size: 1.4rem;
    color: #333;
  }
  &__btn {
    width: 9.8rem;
    background: #0091ff;
    color: #fff;
    text-align: center;
    font-size: 1.4rem;
  }
}
.mask {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    width: 30rem;
    height: 20rem;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.4rem;
    text-align: center;
    &__title {
      font-size: 1.8rem;
      color: #333;
      margin: 2.4rem 0 0 0;
      line-height: 2.6rem;
    }
    &__desc {
      color: #666666;
      font-size: 1.4rem;
      margin: 0.8rem 0 0 0;
    }
    &__btns {
      display: flex;
      margin: 2.4rem 6rem 0 6rem;
      justify-content: center;
    }
    &__btn {
      flex: 1;
      width: 8rem;
      line-height: 3.2rem;
      border: 1px solid #0091ff;
      border-radius: 1.6rem;
      &--first {
        margin-right: 1.2rem;
        color: #0091ff;
      }
      &--last {
        margin-left: 1.2rem;
        color: #0091ff;
      }
    }
  }
}
</style>
