<template>
  <form
    @submit.prevent="
      !showUpdateButton ? handleSubmitProduct() : handleUpdateProduct()
    "
    class="bg-white rounded-xl px-8 pt-6 pb-8 mb-4"
  >
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="name"
        v-model="form.name"
      />
    </div>
    <div class="mb-4">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="description"
      >
        Description
      </label>
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300"
        placeholder="Your message..."
        v-model="form.description"
      ></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
        Price
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="price"
        v-model="form.price"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="quantity">
        Stock
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="quantity"
        v-model="form.quantity"
      />
    </div>
    <div class="mb-4">
      <label for="category" class="block mb-2 text-sm font-medium">
        Category
      </label>
      <select
        class="w-full p-2.5 bg-gray-50 border rounded-lg"
        v-model="selectedCategory"
      >
        <option selected>choose category</option>
        <option
          v-for="category in categoriesList"
          :key="category.id"
          :value="{ id: category.id }"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <div class="flex justify-center items-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer"
        >
          <div class="flex flex-col justify-center items-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              class="mb-3 w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            @change="onFileSelected"
            class="hidden"
          />
        </label>
      </div>
    </div>
    <div v-if="showUpdateButton">
      <div class="flex items-center justify-between">
        <Button class="bg-purple-500">update</Button>
      </div>
    </div>
    <div v-else>
      <div class="flex items-center justify-between">
        <Button class="bg-purple-500">Submit</Button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "./Button.vue";

export default {
  components: {
    Button,
  },
  data() {
    return {
      selectedCategory: "",
      selectedFile: null,
    };
  },
  props: {
    form: {
      id: Number,
      name: String,
      description: String,
      price: String,
      quantity: Number,
      category_id: Number,
    },
    showUpdateButton: Boolean,
  },
  methods: {
    ...mapActions("categories", ["getCategories"]),
    ...mapActions("products", ["addProduct", "updProduct"]),
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    handleSubmitProduct() {
      let formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("price", this.form.price);
      formData.append("quantity", this.form.quantity);
      formData.append("category_id", this.selectedCategory.id);
      formData.append("photo", this.selectedFile);

      this.addProduct(formData);
      this.$store.dispatch("products/getProducts");
      this.form = {};
      this.selectedFile = null;
      this.selectedCategory = "";
    },
    handleUpdateProduct() {
      let formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("price", this.form.price);
      formData.append("quantity", this.form.quantity);
      formData.append(
        "category_id",
        !this.selectedCategory.id
          ? this.form.category_id
          : this.selectedCategory.id
      );
      formData.append("photo", this.selectedFile);
      this.updProduct({
        id: this.form.id,
        formData: formData,
      });
      this.$store.dispatch("products/getProducts");
    },
  },
  created() {
    this.getCategories();
  },
  computed: {
    ...mapGetters("categories", ["categoriesList"]),
  },
};
</script>

<style></style>
