<template>
  <div
    class="relative bg-white h-sceen p-5 duration-300"
    :class="sideOpen ? 'w-72' : 'w-20'"
  >
    <i
      @click="sideOpen = !sideOpen"
      class="bi bi-caret-left-square-fill text-xl absolute -right-2 top-5 cursor-pointer"
      :class="!sideOpen && 'rotate-180 duration-300'"
    />
    <div class="inline-flex">
      <i
        @click="sideOpen = !sideOpen"
        class="bi bi-person-fill bg-purple-700 text-white py-1 px-2 rounded-lg mr-4 duration-500 cursor-pointer"
        :class="sideOpen && 'rotate-[360deg]'"
      />
      <h1 v-show="sideOpen" class="text-purple-700 font-bold text-xl">
        {{ currentUser ? currentUser.name : "Guest" }}
      </h1>
    </div>
    <ul class="pt-10 w-40 text-lg font-medium h-full">
      <li class="flex py-3">
        <nuxt-link to="/">
          <i
            class="bi bi-house-door-fill text-xl py-1 px-2 rounded-lg mr-4"
            :class="
              $route.path == '/'
                ? 'bg-slate-200 text-purple-700'
                : 'text-slate-400'
            "
          />
          <span v-show="sideOpen" class="text-purple-700 font-semibold">
            Home
          </span>
        </nuxt-link>
      </li>
      <li class="flex py-3">
        <nuxt-link to="/point-of-sales">
          <i
            class="bi bi-tv-fill text-xl py-1 px-2 rounded-lg mr-4"
            :class="
              $route.path == '/point-of-sales'
                ? 'bg-slate-200 text-purple-700'
                : 'text-slate-400'
            "
          />
          <span v-show="sideOpen" class="text-purple-700 font-semibold">
            Cashier
          </span>
        </nuxt-link>
      </li>
      <li class="flex py-3">
        <nuxt-link to="/admin">
          <i
            class="bi bi-person-check-fill text-xl py-1 px-2 rounded-lg mr-4"
            :class="
              $route.path == '/admin'
                ? 'bg-slate-200 text-purple-700'
                : 'text-slate-400'
            "
          />
          <span v-show="sideOpen" class="text-purple-700 font-semibold">
            Admin
          </span>
        </nuxt-link>
      </li>
      <li class="flex py-3">
        <nuxt-link to="/help">
          <i
            class="bi bi-question-diamond-fill text-xl py-1 px-2 rounded-lg mr-4"
            :class="
              $route.path == '/help'
                ? 'bg-slate-200 text-purple-700'
                : 'text-slate-400'
            "
          />
          <span v-show="sideOpen" class="text-purple-700 font-semibold">
            Help?
          </span>
        </nuxt-link>
      </li>
      <div v-if="currentUser">
        <li @click="handleLogout" class="flex py-3 cursor-pointer">
          <i
            class="bi bi-box-arrow-left text-2xl text-slate-400 py-1 px-2 rounded-lg mr-4"
          />
          <span v-show="sideOpen" class="text-purple-700 font-semibold pt-1">
            Logout
          </span>
        </li>
      </div>
      <div v-else>
        <li class="flex py-3">
          <nuxt-link to="/auth/login">
            <i
              class="bi bi-box-arrow-in-right text-2xl py-1 px-2 rounded-lg mr-4 cursor-pointer"
              :class="
                $route.path == '/auth/login'
                  ? 'bg-slate-200 text-purple-700'
                  : 'text-slate-400'
              "
            />
            <span v-show="sideOpen" class="text-purple-700 font-semibold">
              Login
            </span>
          </nuxt-link>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      sideOpen: false,
    };
  },
  computed: {
    ...mapGetters("user", ["currentUser"]),
  },
  methods: {
    async handleLogout() {
      this.$axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("userToken");

      await this.$axios.post("api/logout");
      localStorage.removeItem("userToken");
      this.$store.dispatch("user/getCurrentUser", null);
      this.$router.push("/auth/login");
    },
  },
};
</script>

<style></style>
