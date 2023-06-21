<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>

    <Shopinfo :nearbyList="nearbyList" />
  </div>
</template>
<script>
import { get } from "../../utils/request";
import { ref } from "vue";
import Shopinfo from "../../components/ShopInfo.vue";
const usenearbyListEffect = function () {
  let nearbyList = ref([]);
  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    nearbyList.value = result.data;
  };
  return { getNearbyList, nearbyList };
};
export default {
  name: "Nearby",
  components: { Shopinfo },
  setup() {
    // const nearbyList = [
    //   {
    //     id: 1,
    //     imgUrl: "http://www.dell-lee.com/imgs/vue3/near.png",
    //     title: "沃尔玛",
    //     tags: ["月售1W+", "月售1W+", "月售1W+"],
    //     highlight: "vip尊享",
    //   },
    //   {
    //     id: 2,
    //     imgUrl: "http://www.dell-lee.com/imgs/vue3/near.png",
    //     title: "沃尔玛",
    //     tags: ["月售1W+", "月售1W+", "月售1W+"],
    //     hi  ghlight: "vip尊享",
    //   },
    // ];
    const { getNearbyList, nearbyList } = usenearbyListEffect();
    getNearbyList();
    return {
      nearbyList,
    };
  },
};
</script>
<style lang="scss">
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.nearby {
  &__title {
    margin: 1.6rem 0 0.4rem 0;
    font-size: 1.8rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
}
</style>
