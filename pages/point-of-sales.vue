<template>
  <div class="md:w-full md:flex">
    <div class="md:w-full my-5 mx-5">
      <div class="md:flex md:justify-between">
        <span>
          <h1 class="text-3xl font-bold">Cashier</h1>
          <p>This point of Sales app is very ez to use!</p>
        </span>
        <span class="md:block flex justify-center">
          <input
            type="text"
            class="rounded-lg py-2 px-3 focus:outline-purple-700 md:mt-0 mt-3"
            placeholder="Search product..."
            v-model="searchQuery"
            @input="handleSearchProduct"
          />
          <span
            @click="handleCustomizeFilter"
            class="bg-white rounded-lg py-2 px-3 ml-5 cursor-pointer md:mt-0 mt-3"
          >
            <i class="bi bi-sliders"></i>
          </span>
        </span>
      </div>
      <Categories @passCategoryName="fillSearchByCategory" />
      <div v-if="!searchQuery && !searchByCategory">
        <Products />
      </div>
      <div v-else>
        <FilteredProducts />
      </div>
    </div>
    <Cart />
  </div>
</template>

<script>
import Products from "../components/products/Products.vue";
import Cart from "../components/Cart.vue";
import FilteredProducts from "../components/products/FilteredProducts.vue";
import Categories from "../components/categories/Categories.vue";

export default {
  components: {
    Products,
    Cart,
    FilteredProducts,
    Categories,
  },
  data() {
    return {
      searchQuery: "",
      searchByCategory: "",
    };
  },
  methods: {
    handleSearchProduct() {
      this.$store.dispatch("products/searchProduct", this.searchQuery);
    },
    fillSearchByCategory(categoryName) {
      this.searchByCategory = categoryName;
    },
    handleCustomizeFilter() {
      confirm("Under constructor cuy :)");
    },
  },
};
</script>

<style></style>
