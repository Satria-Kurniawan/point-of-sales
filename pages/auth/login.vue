<template>
  <div class="flex w-full justify-center items-center h-screen">
    <div class="w-full max-w-sm">
      <form
        @submit.prevent="handleLogin()"
        class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="email"
            v-model="email"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="password"
            v-model="password"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
          <Button class="bg-purple-500">Login</Button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2022 JSatria Corp. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async handleLogin() {
      const response = await this.$axios.post("api/login", {
        email: this.email,
        password: this.password,
      });
      localStorage.setItem("userToken", response.data.token);
      this.$store.dispatch("user/getCurrentUser", response.data.user);
      this.$router.push("/point-of-sales");
    },
  },
};
</script>

<style></style>
