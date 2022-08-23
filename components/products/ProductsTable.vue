<template>
  <div class="overflow-x-auto relative w-full">
    <table
      class="w-full table-auto bg-white rounded-xl overflow-hidden border-collapse border"
    >
      <thead>
        <tr class="bg-gray-50">
          <th class="py-3 px-6">Photo</th>
          <th class="py-3 px-6">Name</th>
          <th class="py-3 px-6">Description</th>
          <th class="py-3 px-6">Price</th>
          <th class="py-3 px-6">Stock</th>
          <th class="py-3 px-6">Category</th>
          <th class="py-3 px-6">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in productsList"
          :key="product.id"
          class="border-b text-center"
        >
          <td class="py-2 px-6">
            <img
              :src="`https://api.jsatria.my.id/photos/${product.photo}`"
              alt="Photo"
              class="w-10 h-10"
            />
          </td>
          <td class="py-2 px-6">{{ product.name }}</td>
          <td class="py-2 px-6">{{ product.description }}</td>
          <td class="py-2 px-6">{{ product.price }}</td>
          <td class="py-2 px-6">{{ product.quantity }}</td>
          <td class="py-2 px-6">{{ product.category.name }}</td>
          <td>
            <i
              @click="$emit('handleEdit', product)"
              class="bi bi-pencil-square text-blue-500 text-2xl cursor-pointer hover:scale-105 mr-2"
            ></i>
            <i
              @click="handleDelete(product.id)"
              class="bi bi-x-circle-fill text-red-500 text-2xl cursor-pointer hover:scale-105"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "../Button.vue";

export default {
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions("products", ["getProducts", "delProduct"]),
    handleDelete(productId) {
      this.delProduct(productId);
    },
  },
  computed: {
    ...mapGetters("products", ["productsList"]),
  },
  components: {
    Button,
  },
};
</script>

<style></style>
