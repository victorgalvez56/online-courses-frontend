<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Listado de productos"
        :data="products.items"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode == 'grid'"
        :filter="filter"
        :pagination.sync="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn
            @click="modal_add_product = true"
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

          <q-btn
            color="primary"
            icon-right="archive"
            label="Exportar a csv"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="
                props.row.status == 'Active'
                  ? 'green'
                  : props.row.status == 'Inactive'
                  ? 'red'
                  : 'grey'
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
              @click="employee_dialog = true"
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
            Detalle producto
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
            <div class="text-overline">US Region</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Mayank Patel</div>
            <div class="text-caption text-grey">
              Sales and Marketing Executive | Graduate and past committee |
              Keynote speaker on Selling and Recruiting Topics
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://cdn.quasar.dev/img/boy-avatar.png"
            />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-section>
          Assessing clients needs and present suitable promoted products.
          Liaising with and persuading targeted doctors to prescribe our
          products utilizing effective sales skills.
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_add_product">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Agregar nuevo producto
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
          <q-form class="registerProduct" @submit.prevent="submitFormProduct()">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nombre</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="product.name"
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
                    v-model="product.description"
                    label="Description"
                    lazy-rules
                    :rules="[val => !!val || 'La descripción es requerido']"
                  />
                </q-item-section>
              </q-item>
                 
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Tipo</q-item-label>
                  <q-select
                    dense
                    label="Tipo"
                    outlined
                    :options="kinds.items"
                    :option-value="(item) => item === null ? null : item.id"
                    :option-label="(item) => item === null ? 'No hay tipo' : item.name"
                    options-dense
                    v-model="product.kind"
                    lazy-rules
                    :rules="[val => !!val || 'El tipo es requerido']"
                  ></q-select>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Tipo</q-item-label>
                  <q-input
                    dense
                    label="Tipo"
                    outlined
                    v-model="product.kind"
                    options-dense
                    lazy-rules
                    :rules="[val => !!val || 'El tipo es requerido']"
                  ></q-input>
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-actions align="right" class="text-teal">
              <q-btn label="Guardar" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
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
      product: {
        name: "",
        description: "",
        stock: "0",
        kind: "",
        category: ""
      },
      model: null,
      filterOptions: stringOptions,
      mode: "list",
      invoice: {},
      employee_dialog: false,
      modal_add_product: false,
      columns: [
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "name",
          sortable: true
        },
        {
          name: "stock",
          align: "left",
          label: "Stock",
          field: "stock",
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
    this.$store.dispatch("products/readProducts");
        this.$store.dispatch("kinds/readKinds");

  },
  computed: {
        ...mapState("kinds", ["kinds"]),
    ...mapState("products", ["products"])
  },
  methods: {
    ...mapActions("products", ["createProduct"]),
    async submitFormProduct() {
      try {
        await this.createProduct(this.product);
        this.cleanForm(this.product);
        this.modal_add_product = false;
      } catch (error) {
        console.warn("garaaa");
      }
    },
    cleanForm() {
      this.product.name = "";
      this.product.description = "";
      this.product.category = "";
      this.product.description = "";
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
    createValue(val, done) {
      // Calling done(var) when new-value-mode is not set or is "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      if (val.length > 0) {
        const model = (this.model || []).slice();

        val
          .split(/[,;|]+/)
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .forEach(v => {
            if (stringOptions.includes(v) === false) {
              stringOptions.push(v);
            }
            if (model.includes(v) === false) {
              model.push(v);
            }
          });

        done(null);
        this.model = model;
      }
    },

    filterFn(val, update) {
      update(() => {
        if (val === "") {
          this.filterOptions = stringOptions;
        } else {
          const needle = val.toLowerCase();
          this.filterOptions = stringOptions.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
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
