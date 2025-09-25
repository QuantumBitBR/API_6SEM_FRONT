<template>
  <DefaultLayout>
    <div v-if="loading" class="loading-full-screen">
      <Skeleton class="full-card-skeleton"></Skeleton>
    </div>
    <div v-else class="card">
      <div class="card-header">
        <h2>Empresas e Usuários</h2>
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
  </DefaultLayout>
  
  <ConfirmDialog
    v-if="showConfirmDialog"
    :user-to-delete="userToDelete.fullname"
    :deleting-user="deletingUser"
    @cancel="cancelDelete"
    @confirm="deleteUser"
  />
</template>

<script>
import { CompaniesUsersDataService } from '@/services/CompaniesUsersDataService';
import { DeleteUsersDataService } from '@/services/DeleteUserDataService';
import { Skeleton } from 'primevue';
import CompanySection from '@/components/CompanySection.vue'; 
import ConfirmDialog from '@/components/ConfirmDialog.vue'; 
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'CompaniesUsersView',
  components: {
    Skeleton,
    CompanySection,
    ConfirmDialog,
    DefaultLayout
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
        
        const service = new DeleteUsersDataService()

        await service.deleteUser(this.userToDelete.id)
        
        this.loadData()
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
* {
  font-family: 'Inter', sans-serif;
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
  width: 100%;
  /* height: 100%; */
  border-radius: 0;
  background-color: #fff;
  box-shadow: none;
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: 10px 12px;
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

.card-body {
  padding: 8px;
  flex: 1;
}

.companies-container {
  /* max-height: 700px; */
  padding: 8px;
}

.no-data {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding: 8px 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.user-name {
  flex-grow: 1;
  font-weight: 500;
  color: #333;
  font-family: 'SnowUI', system-ui, sans-serif;
  font-size: 53px;
}

</style>