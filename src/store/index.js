import { createStore } from "vuex";
const setCartList = (state) => {
  const cartList = state.cartList;
  // const { cartList } = state;

  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
};
const getCartList = () => {
  try {
    return JSON.parse(localStorage.cartList);
  } catch (e) {
    return {};
  }
};
export default createStore({
  state: {
    cartList: getCartList(),
    // cartList: {
    // // 第一层级是商铺的id
    // shopId: {
    //   shopName: "沃尔玛",
    //   productList: {
    //     // 第二层级是商品id
    //     // 商品内容及购物数量
    //     productId: {
    //       _id: "1",
    //       name: "番茄 250g / 份",
    //       imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
    //       sales: 10,
    //       price: 33.6,
    //       oldPrice: 39.6,
    //     },
    //   },
    // },
    // },
  },
  getters: {},
  mutations: {
    addItemToCart(state, payload) {
      const { shopId, productId, productInfo } = payload;
      console.log(productInfo);

      let shopInfo = state.cartList[shopId] || {
        shopName: "",
        productList: {},
      };
      let product = shopInfo.productList[productId];
      if (!product) {
        product = productInfo;
        product.count = 0;
      }
      product.count = product.count + payload.number;
      if (payload.number > 0) {
        product.check = true;
      }
      if (product.count < 0) {
        product.count = 0;
      }

      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;
      setCartList(state);
    },
    changeCheck(state, payload) {
      const { shopId, productId } = payload;
      let shopInfo = state.cartList[shopId];
      let product = shopInfo.productList[productId];
      product.check = !product.check;
      setCartList(state);
    },
    cleanCartProducts(state, payload) {
      state.cartList[payload.shopId].productList = {};
      setCartList(state);
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;
      console.log(products);

      if (products) {
        for (let i in products) {
          const product = products[i];
          product.check = true;
        }
      }
      setCartList(state);
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      let shopInfo = state.cartList[shopId] || {
        shopName: "",
        productList: {},
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setCartList(state);
    },
    clearCartData(state, payload) {
      state.cartList[payload.shopId].productList = {};
    },
  },
  actions: {},
  modules: {},
});
