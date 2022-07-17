export const state = () => ({
  products: [],
  filteredProducts: [],
});

export const getters = {
  productsList: (state) => state.products,
  filteredProductsList: (state) => state.filteredProducts,
};

export const actions = {
  async getProducts({ commit }) {
    const response = await this.$axios.get("api/products");

    commit("setProducts", response.data.products);
  },
  searchProduct({ commit }, searchQuery) {
    commit("setSearchedProduct", searchQuery);
  },
  filterByCategory({ commit }, categoryName) {
    commit("setProductByCategory", categoryName);
  },
  showAllProducts({ commit }) {
    commit("resetFilteredProduct");
  },
  async addProduct({ commit }, formData) {
    const response = await this.$axios.post("api/add/product", formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        "Content-Type": "multipart/form-data",
      },
    });
    commit("setAddedProduct", response.data.product);
  },
  async delProduct({ commit }, productId) {
    await this.$axios.delete(`api/del/product/${productId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    });
    commit("setProductsAfterDeleted", productId);
  },
  async updProduct({ commit }, { id, formData }) {
    const response = await this.$axios.post(`api/upd/product/${id}`, formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        "Content-Type": "multipart/form-data",
      },
    });
    commit("setUpdatedProduct", response.data.product);
  },
};

export const mutations = {
  setProducts: (state, products) => (state.products = products),
  setSearchedProduct: (state, searchQuery) => {
    if (!searchQuery) return state.products;
    state.filteredProducts = state.products.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  },
  setProductByCategory: (state, categoryName) => {
    if (!categoryName) return state.products;
    state.filteredProducts = state.products.filter((product) => {
      return product.category.name == categoryName;
    });
  },
  resetFilteredProduct: (state) => (state.filteredProducts = state.products),
  setAddedProduct: (state, product) =>
    (state.products = [...state.products, product]),
  setProductsAfterDeleted: (state, productId) =>
    (state.products = state.products.filter(
      (product) => product.id != productId
    )),
  setUpdatedProduct: (state, product) =>
    (state.products = state.products.map((item) =>
      item.id == product.id ? { ...item, ...product } : item
    )),
};
