<template>
  <div>
    <div v-if="loading" class="loading">
      <Skeleton width="100%" height="288px"></Skeleton>
    </div>
    <div v-else class="tabela-src">
      <template v-if="tags.length > 0">
        <DataTable :value="tags" removableSort stripedRows scrollHeight="20rem">
          <Column field="product_name" sortable header="Produto" />
          <Column field="ticket_count" sortable header="Quantidade Tickets" />
        </DataTable>
      </template>

      <template v-else>
        <h4 id="no-text">Nenhum card encontrado para os filtros selecionados</h4>
      </template>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ProductDataService } from '@/services/ProductDataService';
import Skeleton from 'primevue/skeleton';

export default {
  name: 'TagTable',
  components: { DataTable, Column, Skeleton },
  props: {
    filter: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      tags: [],
      products: [],
    };
  },
  methods: {
    async loadData() {
      try {
        this.loading = true;
        const service = new ProductDataService();
        const products = await service.getProductData(this.filter);
        this.tags = products;
      } catch (err) {
        this.tags = [];
      } finally {
        this.loading = false;
      }
    },
    async allProducts() {
      try {
        const service = new ProductDataService();
        const products = await service.getAllProducts();
        this.products = products;
      } catch (err) {
        // Silencioso
      }
    }
  },
  async mounted() {
    await this.loadData();
    await this.allProducts();
  },
  watch: {
    filter: {
      handler(newVal) {
        this.loadData();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
    font-size: 14px;
    font-weight: 600;
    color: black;
}

.tag_header {
  padding: 10px;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.tabela-src {
  border-radius: 12px;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  height: 336px;
}

::v-deep(.p-datatable-table-container) {
  max-height: 24rem;
  overflow: auto;
}

.tabela-src::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}

.tabela-src::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 12px;
}

#no-text {
  display: flex;
  justify-content: center;
  height: 70%;
  align-content: center;
  align-items: center;
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.loading {
  margin: auto;
  color: #666;
  text-align: center;
  padding: 16px 0;
}

@media (max-width: 768px) {
  .tabela-src {
    width: 83vw;
    margin: 0 auto;
  }
}
</style>
