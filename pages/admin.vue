<template>
  <div v-if="currentUser" class="md:w-full m-5">
    <span @click="handleOpenForm">
      <Button :class="openForm ? 'bg-red-500 mb-2' : 'bg-green-500 mb-2'">
        {{ !openForm ? "Create" : "Close" }}
      </Button>
    </span>
    <div class="md:flex">
      <Form
        :showUpdateButton="showUpdateButton"
        :form="form"
        class="w-full md:mr-3"
        :class="!openForm && 'hidden'"
      />
      <ProductsTable @handleEdit="handleEdit" />
    </div>
  </div>
  <div v-else>
    {{ $router.push("/auth/login") }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductsTable from "../components/products/ProductsTable.vue";
import Button from "../components/Button.vue";
import Form from "../components/Form.vue";

export default {
  components: {
    ProductsTable,
    Button,
    Form,
  },
  data() {
    return {
      openForm: false,
      form: {
        id: "",
        name: "",
        description: "",
        price: "",
        quantity: "",
        category_id: "",
      },
      showUpdateButton: false,
    };
  },
  methods: {
    handleOpenForm() {
      this.openForm = !this.openForm;
      this.form = {};
      this.showUpdateButton = false;
    },
    handleEdit(product) {
      if (!this.openForm) this.openForm = !this.openForm;
      this.form = { ...this.form, ...product };
      this.showUpdateButton = true;
    },
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
  },
};
</script>

<style></style>
