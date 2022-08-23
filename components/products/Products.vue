<template>
  <div class="grid md:grid-cols-4 grid-cols-2 gap-3 my-7">
    <div v-for="product in productsList" :key="product.id">
      <div class="relative bg-white rounded-xl p-3">
        <div @click="handleAddToCart(product)" class="absolute -top-2 -right-2">
          <BagPlusIcon />
        </div>
        <div class="flex justify-center">
          <img
            :src="`https://api.jsatria.my.id/photos/${product.photo}`"
            alt="Product Photo"
            class="h-32"
          />
        </div>
        <div class="text-slate-600 mt-3">
          <div class="w-full flex justify-end">
            <span
              class="bg-pink-500 py-1 px-3 font-bold text-xs text-white inline-block rounded-xl"
            >
              {{ product.category.name }}
            </span>
          </div>
          <span class="font-extrabold text-lg block">
            {{ product.name }}
          </span>
          <span class="font-semibold text-md block text-slate-500">
            Stock {{ product.quantity }}
          </span>
          <span class="font-bold text-lg block">Rp. {{ product.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BagPlusIcon from "../icons/BagPlusIcon.vue";

export default {
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions("products", ["getProducts"]),

    handleAddToCart(product) {
      this.$store.dispatch("cart/addToCart", {
        product,
        productQty: 1,
      });
    },
  },
  computed: {
    ...mapGetters("products", ["productsList"]),
  },
  components: {
    BagPlusIcon,
  },
};
</script>

<style></style>
