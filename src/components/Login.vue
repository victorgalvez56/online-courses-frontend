<template>
  <div>
        <section class="u-clearfix u-palette-3-base u-section-1" id="sec-c814">
      <img src="images/Rectangle58.png" alt="" class="u-image u-image-round u-radius-50 u-image-1" data-image-width="529" data-image-height="712">
      <img src="images/Group13.png" alt="" class="u-image u-image-default u-preserve-proportions u-image-2" data-image-width="381" data-image-height="381">
      <img src="images/batmsnxd1.png" alt="" class="u-image u-image-default u-image-3" data-image-width="602" data-image-height="632">
      <div class="u-form u-form-1">
        <form
            @submit.prevent="login(user)"
          class="u-clearfix u-form-spacing-5 u-form-vertical u-inner-form" style="padding: 10px" source="email" name="form">
          <div class="u-form-group u-form-name u-form-group-3">
            <input type="text" v-model="user.username" placeholder="Introduzca su usuario" id="name-1d13" name="name-1" class="u-border-1 u-border-grey-30 u-custom-font u-input u-input-rectangle u-radius-50 u-white u-input-3" required="">
          </div>
          <div class="u-form-group u-form-group-4">
            <input type="text" v-model="user.password"  placeholder="Introduzca su password" id="text-71a7" name="text" class="u-border-1 u-border-grey-30 u-custom-font u-input u-input-rectangle u-radius-50 u-white u-input-4">
          </div>
          <div class="u-align-center u-form-group u-form-submit">
            <button type="submit" class="u-btn u-btn-submit u-button-style">Ingresar</button>
          </div>
        </form>
      </div>
      <h2 class="u-align-center u-heading-font u-subtitle u-text u-text-palette-1-base u-text-1">Registrarse</h2>
    </section>
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


<style>
 @import '../css/Página-1.css';

</style>
