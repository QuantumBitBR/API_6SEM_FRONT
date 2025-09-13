<!-- components/TagTable.vue -->
<template>
  <div>
    <div class="tabela-src">
      <template v-if="tags.length != 0">
        <DataTable :value="tags" removableSort stripedRows scrollHeight="18rem">
          <Column field="nomeProduto" sortable header="Produto" />
          <Column field="quantidade" sortable header="Quantidade Tickets" />
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

export default {
  name: 'TagTable',
  components: { DataTable, Column },
  data() {
    return {
      // MOCK DATA
      tags: [
        { nomeProduto: 'A', quantidade: 5 },
        { nomeProduto: 'B', quantidade: 12 },
        { nomeProduto: 'C', quantidade: 8 },
        { nomeProduto: 'D', quantidade: 3 },
        { nomeProduto: 'E', quantidade: 7 },
      ],
      selectedUser: { idUsuario: 1, nome: 'André' }, // mock
      selectedProject: { id: 101, nome: 'Projeto X' }, // mock
    };
  },
  mounted() {
    console.log('Mock tags:', this.tags);
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
