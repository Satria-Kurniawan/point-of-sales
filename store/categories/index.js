export const state = () => ({
  categories: null,
});

export const getters = {
  categoriesList: (state) => state.categories,
};

export const actions = {
  async getCategories({ commit }) {
    const response = await this.$axios.get("api/categories");

    commit("setCategories", response.data.categories);
  },
};

export const mutations = {
  setCategories: (state, categories) => (state.categories = categories),
};
