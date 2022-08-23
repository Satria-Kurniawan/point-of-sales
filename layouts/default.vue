<template>
  <div class="md:flex md:h-screen">
    <Navbar class="md:hidden block" />
    <Sidebar class="md:block hidden" />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "default",
  components: {
    Navbar,
    Sidebar,
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      if (localStorage.getItem("userToken") !== null) {
        const response = await this.$axios.get("api/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        });
        this.$store.dispatch("user/getCurrentUser", response.data);
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap");

html {
  font-family: "Montserrat", sans-serif;
}

body {
  background-color: whitesmoke;
}
</style>
