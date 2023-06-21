<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe6af;</span>
    北京理工大学国防科技园
    <div class="iconfont position__notice">&#xe6af;</div>
  </div>
  <div class="search">
    <span class="iconfont position__icon">&#xeb67;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="icon in icons" :key="icon.id">
      <img
        :src="`http://www.dell-lee.com/imgs/vue3/${icon.iconName}.png`"
        class="icons__item__img"
      />
      <p class="icons__item__desc">{{ icon.iconName }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>
<script>
export default {
  name: "Staticpart",
  setup() {
    const icons = [
      {
        id: 1,
        iconName: "超市",
        desc: "超市便利",
      },
      {
        id: 2,
        iconName: "菜市场",
        desc: "菜市场",
      },
      {
        id: 3,
        iconName: "水果店",
        desc: "水果店",
      },
      {
        id: 4,
        iconName: "鲜花",
        desc: "鲜花绿植",
      },
      {
        id: 5,
        iconName: "医药健康",
        desc: "医药健康",
      },
      {
        id: 6,
        iconName: "超市",
        desc: "超市便利",
      },
      {
        id: 7,
        iconName: "超市",
        desc: "超市便利",
      },
      {
        id: 8,
        iconName: "医药健康",
        desc: "医药健康",
      },
      {
        id: 9,
        iconName: "超市",
        desc: "超市便利",
      },
      {
        id: 10,
        iconName: "菜市场",
        desc: "菜市场",
      },
    ];
    return { icons };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.position {
  color: $content-fontcolor;
  // 文字溢出
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  @include ellipsis;
  position: relative;
  padding: 1.6rem 2.4rem 1.6rem 0rem;
  line-height: 2.2rem;
  font-size: 1.6rem;
  .position__icon {
    position: relative;
    top: 0.1rem;
    font-size: 2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 1.7rem;
    font-size: 2rem;
  }
}
.search {
  margin-bottom: 1.2rem;
  line-height: 3.2rem;
  background-color: #f5f5f5;
  color: #b7b7b7;
  border-radius: 1.6rem;
  font-size: 1.4rem;
  .iconfont {
    position: relative;
    top: 0.1rem;
    padding: 0rem 1.2rem 0 1.6rem;
    display: inline-block;
    font-size: 1.6rem;
  }
  &__text {
    display: inline-block;
    font-size: 1.4rem;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.6rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      margin: 0 auto;
      width: 4rem;
      height: 4rem;
    }
    &__desc {
      margin: 0.6rem 0 1.6rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.banner {
  // 防止抖动
  height: 0;
  padding-bottom: 25.4%;
  overflow: hidden;
  &__img {
    width: 100%;
  }
}
.gap {
  margin: 0 -1.8rem;
  height: 1.2rem;
  background-color: $content-bgcolor;
}
</style>
