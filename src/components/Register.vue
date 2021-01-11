<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register(user)">
      <label for="name">Name</label>
      <div>
        <input id="name" type="text" v-model="user.fullname" required autofocus />
      </div>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="user.email" required />
      </div>
          <label for="email">Username</label>
      <div>
        <input id="username" type="text" v-model="user.username" required />
      </div>
      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="user.password" required />
      </div>
      <label for="password-confirm">Confirm Password</label>
      <div>
        <input          id="password-confirm"          type="password"          v-model="user.passwordConfirmation"          required
        />
      </div>

      <label for="password-confirm">Teléfono</label>
      <div>
        <input id="phone" type="number" v-model="user.phone" required />
      </div>

      <label for="password-confirm">DNI</label>
      <div>
        <input
          id="document"
          type="number"
          v-model="user.document"
          required
        />
      </div>
      <label for="password-confirm">Rol</label>
      <div>
        <input id="role" type="text" v-model="user.role" required />
      </div>

      <label for="password-confirm">Descripción</label>
      <div>
        <input
          id="description"
          type="number"
          v-model="user.description"
          required
        />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
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
        email: "",
        password: "",
        passwordConfirmation: "",
        fullname: "",
        phone: "",
        document: "",
        role: "",
        description: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["register"])
  }
};
</script>

<style></style>
