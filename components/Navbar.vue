<template>
  <header class="w-full">
    <nav class="bg-white md:py-1 py-4 text-purple-700">
      <div class="md:container md:mx-auto md:px-10 px-5 flex justify-between">
        <div class="flex items-center">
          <span class="w-24">
            <img
              :src="require('assets/images/NuxtJS.png')"
              alt="Brand Logo"
              class="w-12 h-12"
            />
          </span>
          <span class="font-bold text-2xl">Point of Sales</span>
        </div>

        <div @click="toggleNav" class="md:hidden cursor-pointer">
          <span
            :class="
              navOpen
                ? 'line bg-red-500 rotate-45 origin-top-left'
                : 'line bg-slate-800'
            "
          />
          <span :class="navOpen ? 'line' : 'line bg-slate-800'" />
          <span
            :class="
              navOpen
                ? 'line bg-red-500 -rotate-45 origin-bottom-left'
                : 'line bg-slate-800'
            "
          />
        </div>

        <ul
          class="z-10 md:flex items-center text-lg md:static absolute top-16 md:w-auto w-full transition-all ease-in-out duration-300"
          :class="navOpen ? 'left-0 bg-slate-800 text-white' : '-left-[100%]'"
        >
          <li
            v-for="link in links"
            :key="link.id"
            class="text-xl font-bold py-4 md:px-4 px-6"
          >
            <nuxt-link
              :to="link.path"
              :class="
                $route.path == link.path
                  ? 'border-b-2 py-1 border-green-500'
                  : ''
              "
            >
              {{ link.name }}
            </nuxt-link>
          </li>
          <div v-if="!currentUser">
            <li class="py-4 md:px-4 px-6">
              <nuxt-link to="/auth/login">
                <Button class="bg-green-500"> Login </Button>
              </nuxt-link>
            </li>
          </div>
          <div v-else>
            <li
              @click="handleLogout"
              @mouseover="handleOpenLogout"
              @mouseout="handleCloseLogout"
              class="py-4 md:px-4 px-6"
            >
              <Button :class="!openLogout ? 'bg-green-500' : 'bg-red-500'">
                {{ !openLogout ? currentUser.name : "Logout" }}
              </Button>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

import Button from "./Button.vue";

export default {
  components: {
    Button,
  },
  data() {
    return {
      links: [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "Cashier", path: "/point-of-sales" },
        { id: 3, name: "Admin", path: "/admin" },
        { id: 4, name: "Help?", path: "/help" },
      ],
      navOpen: false,
      openLogout: false,
    };
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    handleOpenLogout() {
      this.openLogout = true;
    },
    handleCloseLogout() {
      this.openLogout = false;
    },
    async handleLogout() {
      this.$axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("userToken");

      const response = await this.$axios.post("api/logout");
      if (response.data.success) {
        localStorage.removeItem("userToken");
        this.$store.dispatch("user/getCurrentUser", null);
        this.$router.push("/auth/login");
      }
    },
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
  },
};
</script>

<style></style>
,
