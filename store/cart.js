export const state = () => ({
  cart: [],
});

export const getters = {
  cartContents: (state) => state.cart,
};

export const actions = {
  addToCart({ commit }, { product, productQty }) {
    commit("setCartContents", { product, productQty });
  },
  decreaseItem({ commit }, item) {
    commit("setDecreasedItem", item);
  },
  increaseItem({ commit }, item) {
    commit("setIncreasedItem", item);
  },
};

export const mutations = {
  setCartContents: (state, { product, productQty }) => {
    const sameProduct = state.cart.find(
      (item) => item.product.id === product.id
    );
    if (sameProduct && sameProduct.productQty < product.quantity)
      return sameProduct.productQty++;
    if (state.cart.indexOf(sameProduct) === -1)
      return (state.cart = [...state.cart, { product, productQty }]);
  },

  setDecreasedItem: (state, item) => {
    const selectedProduct = state.cart.find(
      (cartContent) => cartContent.product.id === item.product.id
    );
    if (selectedProduct) {
      item.productQty--;
      if (item.productQty <= 0)
        return (state.cart = state.cart.filter(
          (cartContent) => cartContent.product.id !== item.product.id
        ));
    }
  },

  setIncreasedItem: (state, item) => {
    const selectedProduct = state.cart.find(
      (cartContent) => cartContent.product.id === item.product.id
    );
    if (selectedProduct && item.productQty < item.product.quantity) {
      item.productQty++;
    }
  },
};
