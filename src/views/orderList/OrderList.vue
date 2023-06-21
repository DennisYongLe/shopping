<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">
            {{ item.isCanceled ? "已取消" : "已下单" }}
          </span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(innerItem, innerindex) in item.products"
              :key="innerindex"
            >
              <img
                class="order__content__img"
                :src="innerItem.product.img"
                v-if="innerindex <= 3"
              />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">￥{{ item.total }}</div>
            <div class="order__content__count">共{{ item.count }}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>

<script setup>
import Docker from "../home/Docker.vue";
import { reactive, toRefs } from "vue";
import { get } from "../../utils/request";
// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: {} });
  const getNearybyList = async () => {
    const result = await get("/api/order");

    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data;
      orderList.forEach((order) => {
        const products = order.products || [];
        let total = 0;
        let count = 0;
        products.forEach((product) => {
          total += product?.product?.price * product?.orderSales || 0;
          count += product?.orderSales || 0;
        });
        order.total = total;
        order.count = count;
      });
      data.list = orderList;
    }
    console.log(data.list);
  };
  const { list } = toRefs(data);
  getNearybyList();
  return { data, list };
};
const { list } = useOrderListEffect();
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  overflow-y: hidden;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 5rem;
  right: 0;
  background: $bgColor;
}
.title {
  font-size: 1.6rem;
  color: #333;
  text-align: center;
  line-height: 4.4rem;
  background: $bgColor;
}

.order {
  margin: 1.6rem 1.8rem;
  padding: 1.6rem;
  background: #eee;
  &__title {
    margin-bottom: 1.6rem;
    line-height: 2.2rem;
    font-size: 1.6rem;
    color: $content-fontcolor;
  }
  &__status {
    float: right;
    font-size: 1.4rem;
    color: $light-fontColor;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: 4rem;
      height: 4rem;
      margin-right: 1.2rem;
    }
    &__info {
      width: 7rem;
    }
    &__price {
      margin-bottom: 0.4rem;
      line-height: 2rem;
      font-size: 1.4rem;
      color: $hightlight-fontColor;
      text-align: right;
    }
    &__count {
      line-height: 2rem;
      font-size: 1.2rem;
      color: $content-fontcolor;
      text-align: right;
    }
  }
}
</style>
