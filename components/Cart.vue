<template>
  <div
    class="md:relative md:max-w-xs max-w-fit bg-white p-3 md:float-right md:duration-500 md:rounded-none rounded-xl md:mx-0 mx-5 md:mb-0 mb-5"
    :class="cartOpen ? 'w-full' : 'w-20'"
  >
    <i
      @click="cartOpen = !cartOpen"
      class="bi bi-caret-right-square-fill absolute bottom-5 -left-2 text-xl cursor-pointer duration-300 md:block hidden"
      :class="!cartOpen && 'rotate-180'"
    ></i>
    <div
      class="inline-flex duration-300 cursor-pointer"
      :class="!cartOpen && 'py-2 px-2.5'"
    >
      <i
        @click="cartOpen = !cartOpen"
        class="bi bi-bag-check-fill bg-purple-700 text-white py-1 px-2 rounded-lg mr-4"
      >
      </i>
      <span v-show="cartOpen" class="text-2xl font-bold block">Cart</span>
    </div>
    <tr
      v-for="item in cartContents"
      :key="item.id"
      class="grid grid-cols-12 border-b border-b-slate-200 py-3 mt-5"
      :class="!cartOpen && 'hidden'"
    >
      <td class="col-span-4">{{ item.product.name }}</td>
      <td @click="handleDecrement(item)" class="col-span-1">
        <DashSquare class="text-purple-700 flex justify-center" />
      </td>
      <td class="col-span-1 text-center">
        {{ item.productQty }}
        <span class="text-green-500 font font-semibold">
          {{ item.productQty == item.product.quantity ? "Max" : "" }}
        </span>
      </td>
      <td @click="handleIncrement(item)" class="col-span-1">
        <PlusSquare
          class="flex justify-center"
          :class="
            item.productQty == item.product.quantity
              ? 'text-purple-700 opacity-60'
              : 'text-purple-700'
          "
        />
      </td>
      <td class="col-span-5 ml-1">
        {{
          Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(item.product.price * item.productQty)
        }}
      </td>
    </tr>
    <div
      class="mt-5 text-lg font-semibold flex justify-between"
      :class="!cartOpen && 'hidden'"
    >
      <span> Total :</span>
      <span>
        {{
          Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(
            cartContents.reduce(
              (accumulator, current) =>
                accumulator + current.product.price * current.productQty,
              0
            )
          )
        }}
      </span>
    </div>
    <div v-if="cartContents.length !== 0" v-show="cartOpen">
      <span>
        <input
          type="text"
          placeholder="Payment amount..."
          class="w-full my-3 bg-slate-100 p-3 rounded-lg focus:outline-purple-700"
          v-model="cash"
          @input="handleChangeOver"
        />
      </span>
      <div
        class="text-lg font-semibold flex justify-between"
        :class="!cartOpen && 'hidden'"
      >
        <span> Change Over : </span>
        <span> {{ changeOver }} </span>
      </div>
      <span @click="handlePrintReceipt">
        <Button class="w-full my-5 bg-green-500">Print Receipt</Button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DashSquare from "../components/icons/DashSquare.vue";
import PlusSquare from "../components/icons/PlusSquare.vue";
import Button from "../components/Button.vue";

export default {
  data() {
    return {
      cartOpen: true,
      cash: "",
      changeOver: "",
    };
  },
  components: {
    DashSquare,
    PlusSquare,
    Button,
  },
  computed: {
    ...mapGetters("cart", ["cartContents"]),
  },
  methods: {
    handleDecrement(item) {
      this.$store.dispatch("cart/decreaseItem", item);
    },
    handleIncrement(item) {
      this.$store.dispatch("cart/increaseItem", item);
    },
    handleChangeOver() {
      const total = this.cartContents.reduce(
        (accumulator, current) =>
          accumulator + current.product.price * current.productQty,
        0
      );
      this.changeOver = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(this.cash - total);
    },
    handlePrintReceipt() {
      confirm("Under constructor cuy :)");
    },
  },
};
</script>

<style></style>
