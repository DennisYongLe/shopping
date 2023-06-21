// import { toRefs, computed } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
export const useCartEffetct = (shopId) => {
  const store = useStore();
  // const cartList = toRefs(store.state.cartList);
  // const { cartList } = toRefs(store.state);
  const cartList = store.state.cartList;
  const addItemToCart = (shopId, productId, productInfo, number) => {
    store.commit("addItemToCart", { shopId, productId, productInfo, number });
  };
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {};
    const notEmptyProductList = {};
    for (let key in productList) {
      const product = productList[key];
      if (product.count > 0) {
        notEmptyProductList[key] = product;
      }
    }
    return notEmptyProductList;
  });
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || [];
    return shopName;
  });
  const calcutations = computed(() => {
    const result = { total: 0, price: 0, allChecked: true };
    // let count = 0;
    // let price = 0;
    // let allChecked = true;
    const productList = cartList[shopId]?.productList;

    if (productList) {
      for (let i in productList) {
        result.total += productList[i].count;
        if (productList[i].check) {
          result.price += productList[i].count * productList[i].price;
        }
        const product = productList[i];
        if (product.total > 0 && !product.check) {
          result.allChecked = false;
        }
      }
    }
    result.price = result.price.toFixed(2);

    return result;
  });
  return { calcutations, cartList, shopName, productList, addItemToCart };
};
