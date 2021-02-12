<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Listado de Tipos"
        :data="kinds.items"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode == 'grid'"
        :filter="filter"
        :pagination.sync="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn
            @click="modal_add_kind = true"
            outline
            color="primary"
            label="Agregar nuevo"
            class="q-mr-xs"
          />
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{
                props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
              }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="
              mode = mode === 'grid' ? 'list' : 'grid';
              separator = mode === 'grid' ? 'none' : 'horizontal';
            "
            v-if="!props.inFullscreen"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{ mode === "grid" ? "List" : "Grid" }}
            </q-tooltip>
          </q-btn>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="
                props.row.status == 'true'
                  ? 'green'
                  : props.row.status == 'false'
                  ? 'red'
                  : 'green'
              "
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
              >{{ props.row.status }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-detail="props">
          <q-td :props="props">
            <q-btn
              @click="showDetails(props)"
              dense
              round
              color="secondary"
              icon="pageview"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn dense color="primary" icon="edit" />
              <q-btn dense color="red" icon="delete" />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="employee_dialog">
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-h6">
            Detalle Tipo
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">{{ detailsKind.name }}</div>
            <div class="text-caption text-grey">
              {{ detailsKind.description }}
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" :src="detailsKind.path" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-section>
          Evaluar las necesidades de los clientes y presentar los productos
          promocionados adecuados. Servir de enlace y persuadir a los médicos
          seleccionados para que prescriban nuestros productos que utilizan
          habilidades de ventas efectivas.
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_add_kind">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Agregar nuevo Tipo
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="registerKind" @submit.prevent="submitFormKind()">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nombre</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="kind.name"
                    label="Nombre"
                    lazy-rules
                    :rules="[val => !!val || 'El nombre es requerido']"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Description</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="kind.description"
                    label="Descripción"
                    lazy-rules
                    :rules="[val => !!val || 'La descripción es requerida']"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-uploader
                    id="uploader"
                    ref="refUploader"
                    accept=".jpg, image/*"
                    hide-upload-btn
                    multiple
                    style="width: 100%"
                    @added="onAddedImage"
                    @removed="onRemovedImage"
                  />
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-actions align="right" class="text-teal">
              <q-btn
                label="Guardar"
                :loading="form.isProcessing"
                type="submit"
                color="primary"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { exportFile } from "quasar";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  data() {
    return {
      filter: "",
      kind: {
        name: "",
        description: ""
      },
      detailsKind: {
        name: "",
        description: "",
        file: ""
      },
      files: [],
      form: {
        isProcessing: false
      },
      mode: "list",
      invoice: {},
      employee_dialog: false,
      modal_add_kind: false,
      columns: [
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "name",
          sortable: true
        },
        {
          name: "description",
          required: true,
          label: "Description",
          align: "left",
          field: "description",
          sortable: true
        },
        {
          name: "status",
          align: "left",
          label: "Status",
          field: "status",
          sortable: true
        },
        {
          name: "detail",
          align: "left",
          label: "Detail",
          field: "detail",
          sortable: true
        },
        {
          name: "action",
          align: "left",
          label: "Action",
          field: "action",
          sortable: true
        }
      ],
      pagination: {
        rowsPerPage: 10
      }
    };
  },

  mounted() {
    this.$store.dispatch("kinds/readKinds");
  },
  computed: {
    ...mapState("kinds", ["kinds"])
  },
  methods: {
    ...mapActions("kinds", [
      "createKind",
      "setPictureKind",
      "getKind",
      "getPictureKind"
    ]),

    async submitFormKind() {
      try {
        this.form.isProcessing = true;
        var responseKind = await this.createKind(this.kind);
        const fd = new FormData();
        let submitPictures = await Promise.all(
          this.files.map(file => {
            fd.append("file", file);
          })
        );
        const data = [responseKind.id, fd];
        console.warn(data);
        return this.setPictureKind(data);
      } catch (_) {
        console.warn(_);
      } finally {
        this.form.isProcessing = false;
        this.cleanForm(this.kind);
        this.modal_add_kind = false;
      }
    },
    async submitPictureForm() {},
    cleanForm() {
      this.kind.name = "";
      this.kind.description = "";
    },
    exportTable() {
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile(
        "employee_salary_list.csv",
        content,
        "text/csv"
      );

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    },
    async showDetails(props) {
      try {
        this.employee_dialog = true;
        this.form.isProcessing = true;
        let idKind = props.row.id;
        const kind = await this.getKind(idKind);

        const pictureKind = await this.getPictureKind(kind.file);
        this.detailsKind.name = kind.data.name;
        this.detailsKind.description = kind.data.description;
        this.detailsKind.path =
          "https://api-delivery.rvalcami.cloud/api/kind/media/" +
          kind.data.file;
        return kind;
      } catch (_) {
        console.warn(_);
      } finally {
        this.form.isProcessing = false;
      }
    },
    onAddedImage(e) {
      this.files.push(...e);
    },

    onRemovedImage(e) {
      this.files = this.files.filter(f => f.name !== e[0].name);
    }
  }
};
</script>
<style>
.q-chip__content {
  display: block;
  text-align: center;
}
</style>
