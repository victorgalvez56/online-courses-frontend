<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered class>
          <q-card-section>
            <div class="text-h6">Agregar Producto</div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-form class="registerProduct" @submit.prevent="registerProduct(product)">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Nombre</q-item-label>
                    <q-input
                      dense
                      outlined
                      v-model="product.name"
                      label="Nombre"
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
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Categoría</q-item-label>
                    <q-select
                      dense
                      label="Categoría"
                      outlined
                      v-model="product.category"
                      :options="options"
                      stack-label
                      options-dense
                    ></q-select>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Tipo</q-item-label>
                    <q-select
                      dense
                      label="Categoría"
                      outlined
                      v-model="product.kind"
                      :options="options"
                      stack-label
                      options-dense
                    ></q-select>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-card-actions align="right" class="text-teal">
                <q-btn label="Guardar" type="submit" color="primary" v-close-popup />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-card flat bordered class>
          <q-card-section>
            <div class="text-h6">Listado de Productos</div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-table
              :data="data"
              :hide-header="mode === 'grid'"
              :columns="columns"
              row-key="name"
              :grid="mode == 'grid'"
              :filter="filter"
              :pagination.sync="pagination"
            >
              <template v-slot:top-right="props">
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
                    >{{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
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
                  label="Export to csv"
                  no-caps
                  @click="exportDepositsTable"
                />
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      filter: "",
      mode: "list",
      product: {
        name: "",
        description: "",
        stock: "0",
        kind: "",
        category: "",
      },
      deposit: {},
      pagination: {
        rowsPerPage: 10,
      },
      options: ["National Bank", "Bank of Asia", "Corporate Bank", "Public Bank"],
      columns: [
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "name",
          sortable: true,
        },
        {
          name: "stock",
          label: "Stock",
          align: "left",
          field: "stock",
          sortable: true,
        },
        {
          name: "price",
          label: "Precio",
          align: "left",
          field: "price",
          sortable: true,
        },
        {
          name: "kind",
          label: "Tipo",
          align: "left",
          field: "kind",
          sortable: true,
        },
        {
          name: "category",
          label: "Category",
          align: "left",
          field: "category",
          sortable: true,
        },
      ],
      data: [
        {
          name: "Invoice 10 Payment",
          stock: "$ 200",
          price: "$ 200",
          kind: "$ 200",
          category: "$ 200",
        },
        {
          name: "Pvt Ltd Invoice",
          category: "$ 300",
        },
        {
          name: "Invoice 6 Payment",
          category: "$ 250ss",
        },
        {
          description: "Invoice 18 Payment",
          description: "$ 400",
        },
        {
          description: "John and company Payment",
          description: "$ 500",
        },
      ],
    };
  },
  methods: {
    ...mapActions("products", ["registerProduct"]),
    exportDepositsTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.data.map((row) =>
            this.columns
              .map((col) =>
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

      const status = exportFile("deposits.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
    showLoading() {
      this.$q.loading.show({
        message: "<b>Demo loading screen, replace your message here<b>",
      });

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    },
    beforeDestroy() {
      if (this.timer !== void 0) {
        clearTimeout(this.timer);
        this.$q.loading.hide();
      }
    },
  },
  beforeMount() {
    this.showLoading();
  },
};
</script>

<style scoped></style>