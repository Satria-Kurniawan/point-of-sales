<template>
  <div class="grid md:grid-cols-5 grid-cols-2 gap-3 text-lg font-semibold my-5">
    <div
      @click="handleShowAll"
      class="bg-white p-3 rounded-lg flex cursor-pointer"
      :class="!selectedCategory ? 'border border-purple-700' : 'border-0'"
    >
      <h1 class="ml-3">Show All</h1>
    </div>
    <div v-for="category in categoriesList" :key="category.id">
      <div
        @click="handleFilterByCategory(category.name)"
        class="bg-white p-3 rounded-lg flex cursor-pointer"
        :class="selectedCategory == category.name && 'border border-purple-700'"
      >
        <h1 class="ml-3">{{ category.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedCategory: "",
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    ...mapActions("categories", ["getCategories"]),
    handleFilterByCategory(categoryName) {
      this.selectedCategory = categoryName;

      this.$store.dispatch("products/filterByCategory", categoryName);
      this.$emit("passCategoryName", categoryName);
    },
    handleShowAll() {
      this.selectedCategory = "";

      this.$store.dispatch("products/showAllProducts");
    },
  },
  computed: {
    ...mapGetters("categories", ["categoriesList"]),
  },
};
</script>

<style></style>
