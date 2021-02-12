<template>
  <q-page-container>
    <q-page class="flex bg-image flex-center">
      <q-card
        class="login-form"
        v-bind:style="
          $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
        "
      >
        <q-img
          src="https://image.freepik.com/vector-gratis/servicio-entrega-concepto-mascaras_23-2148499097.jpg"
        ></q-img>
        <q-card-section>
          <q-avatar
            size="74px"
            class="absolute"
            style="top: 0;right: 25px;transform: translateY(-50%);"
          >
            <img
              src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-delivery-truck-icon-png-image_314439.jpg"
            />
          </q-avatar>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis text-primary">
              Registrarse
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <form @submit.prevent="submitFormRegister()" class="q-gutter-md">
            <q-input
              filled
              v-model="user.fullname"
              label="Nombre"
              lazy-rules
            />
            <q-input
              type="email"
              filled
              v-model="user.email"
              label="Email"
              lazy-rules
            />
            <q-input
              type="text"
              filled
              v-model="user.username"
              label="Usuario"
              lazy-rules
            />
            <q-input
              type="password"
              filled
              v-model="user.password"
              label="Contraseña"
              lazy-rules
            />
            <q-input
              type="password"
              filled
              v-model="user.passwordConfirmation"
              label="Confirmación Contraseña"
              lazy-rules
            />
            <q-input
              type="number"
              filled
              v-model="user.phone"
              label="Teléfono"
              lazy-rules
            />
            <q-input
              type="number"
              filled
              v-model="user.document"
              label="Dni"
              lazy-rules
            />
            <div>
              <button filled type="submit" class="u-btn u-btn-submit bg-primary">
                Guardar
              </button>
              <a
                style="font-size: 30px;"
                class="float-right"
                href="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-delivery-truck-icon-png-image_314439.jpg"
                target="_blank"
                title="Donate"
                ><i class="fas fa-heart" style="color: #eb5daa"></i
              ></a>
            </div>
          </form>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
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
        role: "ROOT",
        description: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async submitFormRegister() {
      try {
        await this.register(this.user);
        // this.cleanForm(this.category);
      } catch (error) {
        console.warn("garaaa");
      }
    }
  }
};
</script>

<style>
@import "../css/Página-1.css";
</style>
