<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div v-if="loading" class="loading-container">
      <Skeleton class="full-card-skeleton"></Skeleton>
    </div>
    <div v-else class="modal-container">
      <div class="card">
        <div class="card-header">
          <h2>Empresas e Usuários</h2>
          <button class="close-button" @click="$emit('close')">
            <img src="../images/xclose.jpg" alt="Fechar" class="close-icon" />
          </button>
        </div>
        <div class="card-body">
          <div v-if="companiesData.length === 0" class="no-data">
            <p>Nenhuma empresa encontrada</p>
          </div>
          <div v-else class="companies-container">
            <CompanySection
              v-for="company in companiesData"
              :key="company.company_name"
              :company="company"
              :deletingUser="deletingUser"
              @confirm-delete="confirmDeleteUser"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <ConfirmDialog
    v-if="showConfirmDialog"
    :user-to-delete="userToDelete"
    :deleting-user="deletingUser"
    @cancel="cancelDelete"
    @confirm="deleteUser"
  />
</template>

<script>
import { CompaniesUsersDataService } from '@/services/CompaniesUsersDataService';
import { Skeleton } from 'primevue';
import CompanySection from '@/components/CompanySection.vue'; // Importe o componente menor
import ConfirmDialog from '@/components/ConfirmDialog.vue'; // Importe o componente de diálogo

export default {
  name: 'CompaniesUsersView',
  components: {
    Skeleton,
    CompanySection,
    ConfirmDialog
  },
  emits: ['close'],
  data() {
    return {
      companiesData: [],
      loading: true,
      showConfirmDialog: false,
      userToDelete: null,
      deletingUser: null
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const service = new CompaniesUsersDataService();
        this.companiesData = await service.getCompaniesUsers();
      } catch (error) {
        console.error("Erro ao carregar dados das empresas:", error);
      } finally {
        this.loading = false;
      }
    },
    
    confirmDeleteUser(user) {
      this.userToDelete = user;
      this.showConfirmDialog = true;
    },
    
    cancelDelete() {
      this.showConfirmDialog = false;
      this.userToDelete = null;
      this.deletingUser = null;
    },
    
    async deleteUser() {
      if (!this.userToDelete) return;
      
      this.deletingUser = this.userToDelete;
      
      try {
        // Simulação de delay para a requisição de exclusão
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Lógica de exclusão no front-end
        this.companiesData = this.companiesData.map(company => ({
          ...company,
          users: company.users.filter(user => user !== this.userToDelete)
        }));
        
        console.log("Usuário deletado com sucesso:", this.userToDelete);
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
      } finally {
        this.cancelDelete();
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para o modal e o card principal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  max-width: 900px;
  width: 100%;
  margin: 20px;
}

.loading-container {
  width: 100%;
  max-width: 900px;
  padding: 20px;
}

.full-card-skeleton {
  width: 100%;
  height: 320px;
}

.card {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-height: 320px;
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-family: 'SnowUI', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
}

.card-body {
  padding: 8px;
  flex: 1;
}

.companies-container {
  max-height: 400px; /* Ajuste a altura conforme necessário */
  overflow-y: auto;
  padding: 8px;
}

.no-data {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0; 
}

.close-icon {
  width: 20px;  
  height: 20px;
  opacity: 0.7; 
  transition: opacity 0.2s ease;
}

.close-icon:hover {
  opacity: 1;
}
</style>