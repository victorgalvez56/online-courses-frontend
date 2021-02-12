<template>
  <q-page>
    <section class="u-clearfix u-palette-1-base u-section-1" id="sec-008c">
      <h1 class="u-align-center u-heading-font u-text u-title u-text-1">
        Aquí va el slogan que tenga
      </h1>
      <h2 class="u-align-center u-heading-font u-subtitle u-text u-text-2">
        Aquí va un pequeño texto importante
      </h2>
      <img
        src="images/Vector1.png"
        alt=""
        class="u-expanded-width u-image u-image-default u-image-1"
        data-image-width="1508"
        data-image-height="307"
      />
      <img
        src="images/Ellipse19.png"
        alt=""
        class="u-image u-image-default u-preserve-proportions u-image-2"
        data-image-width="60"
        data-image-height="60"
      />
      <img
        src="images/Ellipse19.png"
        alt=""
        class="u-image u-image-default u-preserve-proportions u-image-3"
        data-image-width="60"
        data-image-height="60"
      />
      <img
        src="images/Ellipse19.png"
        alt=""
        class="u-image u-image-default u-preserve-proportions u-image-4"
        data-image-width="60"
        data-image-height="60"
      />
      <a
        href="https://nicepage.com/static-site-generator"
        class="u-border-2 u-border-hover-white u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-radius-50 u-text-hover-white u-text-palette-1-base u-white u-btn-1"
        >BUSCAR</a
      >
    </section>
    <!-- 
    <div class="q-pa-md">
      <div class="row q-gutter-xs">
        <div class="col-4" v-for="kind in kinds.items" :key="`xl-${kind}`">
          <div class="my-content">
            <a :href="'/' + kind.name">
              <q-card class="my-card" to="/mails">
                <q-img
                  :src="
                    'https://api-delivery.rvalcami.cloud/api/kind/media/' +
                      kind.file"
                >
                  <div class="text-h5 absolute-bottom text-right">
                    {{ kind.name }}
                  </div>
                </q-img>
              </q-card>
            </a>
          </div>
        </div>
      </div>
    </div> -->

    <div class="q-pa-md">
      <div class=" q-gutter-y-lg">
        <div v-for="kind in kinds.items" :key="`xl-${kind}`">
          <div class="my-content ">
            <a :href="'/' + kind.name">
              <q-card class="my-card" to="/mails">
                <q-img
                  :src="'https://api-delivery.rvalcami.cloud/api/kind/media/' +
                      kind.file">
                  <div class="text-h5 absolute-bottom text-right">
                    {{ kind.name }}
                  </div>
                </q-img>
              </q-card>
            </a>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("kinds/readKinds");
  },
  computed: {
    ...mapState("kinds", ["kinds"])
  }
};
</script>
<style scoped>
.card-background {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
</style>
