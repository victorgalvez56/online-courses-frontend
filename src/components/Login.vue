<template>
  <div>
    <form class="login" @submit.prevent="login(user)">
      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model="user.username" type="text" placeholder="Name" />
      <label>Password</label>
      <input required v-model="user.password" type="password" placeholder="Password" />
      <hr />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
  },
};
</script>

<style></style>
