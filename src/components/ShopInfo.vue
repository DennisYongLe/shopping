<template>
  <router-link
    :to="`/shop/${i._id}`"
    :v-show="i.imgURL"
    v-for="i in nearbyList"
    :key="i._id"
  >
    <div class="shop">
      <img :src="i.imgUrl" class="shop__img" />
      <div
        :class="{
          'shop__content--bordered': hideBorder ? false : true,
        }"
      >
        <div class="shop__content__title">{{ i.name }}</div>
        <div class="shop__content__tags">
          <span class="shop__content__tag"> 月售:{{ i.sales }} </span>
          <span class="shop_content__tag"> 起送:{{ i.expressLimit }}</span>
          <span class="shop__content__tag">基础运费:{{ i.expressPrice }} </span>
        </div>
        <p class="shop__content__highlight">{{ i.slogan }}</p>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "ShopInfo",
  props: ["nearbyList", "hideBorder"],
  setup() {},
};
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
a {
  text-decoration: none;
}
.shop {
  display: flex;
  padding-top: 0.4rem;

  &__img {
    margin-right: 1.6rem;
    width: 5.6rem;
    height: 5.6rem;
  }
  &__content {
    padding-bottom: 0.4rem;
    &--bordered {
      border-bottom: 3px solid $content-bgcolor;
    }
    // flex: 1;
    &__title {
      line-height: 2.2rem;
      font-size: 1.6rem;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 1.8rem;
      font-size: 1.3rem;
    }
    &__tag {
      margin-right: 1.6rem;
    }
    &__highlight {
      margin: 0.08rem 0rem 0rem 0rem;
      line-height: 1.8rem;
      font-size: 1.3rem;
      color: red;
    }
  }
}
</style>
