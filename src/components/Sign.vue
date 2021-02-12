<template>
  <section class="u-align-center u-clearfix u-section-1" id="carousel_82f9">
    <div
      class="u-clearfix u-sheet u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-valign-middle-xs u-sheet-1"
    >
      <div
        class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1"
      >
        <div class="u-layout">
          <div class="u-layout-row">
            <div
              class="u-align-center u-container-style u-layout-cell u-right-cell u-size-30 u-layout-cell-1"
            >
              <q-card>
                <q-tabs v-model="tab">
                  <q-tab
                    class="font-poppins"
                    name="mails"
                    label="Ingresar"
                    active-bg-color
                    icon="login"
                  />
                  <q-tab
                    name="alarms"
                    class="font-poppins"
                    label="Registro"
                    icon="person_add"
                  />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="mails">
                    <h2 class="u-text u-text-1">
                      <span class="u-text-palette-2-base">Iniciar</span
                      >&nbsp;<span class="u-text-black">Sesión</span>
                      <br />
                    </h2>
                    <div class="u-form u-form-1">
                      <q-form
                        class="registerProduct"
                        @submit.prevent="login(user)"
                      >
                        <q-list style="text-align: left;">
                          <q-item>
                            <q-item-section>
                              <q-item-label class="q-pb-xs"
                                >Nombre</q-item-label
                              >
                              <q-input
                                dense
                                outlined
                                v-model="user.username"
                                label="Nombre"
                              />
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label class="q-pb-xs"
                                >Description</q-item-label
                              >
                              <q-input
                                dense
                                outlined
                                v-model="user.password"
                                label="Descripción"
                              />
                            </q-item-section>
                          </q-item>
                        </q-list>
                        <q-card-actions
                          align="right"
                          class="text-teal vertical-middle	"
                        >
                          <q-btn
                            label="Guardar"
                            type="submit"
                            color="primary"
                            v-close-popup
                            class=" center	u-btn u-btn-round u-btn-submit u-button-style u-custom-color-3 u-radius-50 u-btn-1"
                          />
                        </q-card-actions>
                      </q-form>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="alarms">
                    <div class="text-h6">Alarms</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>

            <div
              class="u-container-style u-expand-resize u-layout-cell u-left-cell u-size-30 u-layout-cell-2"
            >
              <div
                class="u-container-layout u-valign-middle-xl u-container-layout-2"
              >
                <div
                  class="u-shape u-shape-svg u-text-palette-2-base u-shape-1"
                >
                  <svg
                    class="u-svg-link"
                    preserveAspectRatio="none"
                    viewBox="0 0 160 160"
                    style=""
                  >
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#svg-a0bf"
                    ></use>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    xml:space="preserve"
                    class="u-svg-content"
                    viewBox="0 0 160 160"
                    x="0px"
                    y="0px"
                    id="svg-a0bf"
                    style="enable-background: new 0 0 160 160"
                  >
                    <path
                      d="M80,30c27.6,0,50,22.4,50,50s-22.4,50-50,50s-50-22.4-50-50S52.4,30,80,30 M80,0C35.8,0,0,35.8,0,80s35.8,80,80,80
	s80-35.8,80-80S124.2,0,80,0L80,0z"
                    ></path>
                  </svg>
                </div>
                <div
                  class="u-image u-image-circle u-image-1"
                  data-image-width="1080"
                  data-image-height="810"
                ></div>
                <div
                  alt=""
                  class="u-align-left u-border-18 u-border-palette-2-base u-image u-image-circle u-image-2"
                  data-image-width="1200"
                  data-image-height="800"
                ></div>
                <div
                  class="u-custom-color-3 u-shape u-shape-circle u-shape-2"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      tab: "mails"
    };
  },
  methods: {
    ...mapActions("auth", ["login"])
  }
};
</script>

<style>
.hoverButton:hover {
  background: inherit;
}
</style>
