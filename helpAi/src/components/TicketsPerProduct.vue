<!-- components/TagTable.vue -->
<template>
  <div>
    <div v-if="loading" class="loading">
      <Skeleton width="100%" height="288px"></Skeleton>
    </div>
    <div v-else="" class="tabela-src">
      <template v-if="tags.length != 0">
        <DataTable :value="tags" removableSort stripedRows scrollHeight="18rem">
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
import { Skeleton } from 'primevue';

export default {
  name: 'TagTable',
  components: { DataTable, Column, Skeleton },
  data() {
    return {
      loading: true,
      tags: [],
    };
  },
  methods:{
    async loadData(){
      try{
        const service = new ProductDataService();
        const products = await service.getProductData();

        this.tags = products;
        this.loading = false;
      }catch(err){
        console.error("Error to get data:", err);
      }
    }
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* sombra roxa suave */
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
}

@media (max-width: 768px) {
  .tabela-src {
    width: 83vw;
    margin: 0 auto;
  }
}
</style>
