<template>
  <q-page class="flex flex-center">
    <q-card
      class="login-form"
      v-bind:style="$q.platform.is.mobile ? { width: '80%' } : { width: '30%' }"
    >
      <q-img src="https://image.freepik.com/vector-gratis/servicio-entrega-concepto-mascaras_23-2148499097.jpg"></q-img>
      <q-card-section>
        <q-avatar
          size="74px"
          class="absolute"
          style="top: 0;right: 25px;transform: translateY(-50%);"
        >
          <img src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-delivery-truck-icon-png-image_314439.jpg" />
        </q-avatar>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis font-poppins ">
            Ingresar
          </div>
        </div>
      </q-card-section>
      <q-card-section>
         <form
            @submit.prevent="login(user)" class="q-gutter-md">
          <q-input filled
                    class="font-poppins"

           v-model="user.username" label="Usuario" lazy-rules />

          <q-input
          class="font-poppins"
            type="password"
            filled
            v-model="user.password"
            label="Contraseña"
            lazy-rules
          />
          <div>
            <button type="submit" class="u-btn u-btn-submit u-button-style font-poppins">
              Ingresar
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
</template>

<script type="text/javascript"></script>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
  }
};
</script>
<style>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal_gradient {
  background: #e5e5e5;
}
.dark_gradient {
  background: #e5e5e5;
}
.login-form {
  position: absolute;
}
</style>
