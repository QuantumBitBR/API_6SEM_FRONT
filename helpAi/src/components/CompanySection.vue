<template>
  <div class="company-section">
    <div class="company-header">
      <h3>{{ company.company_name }}</h3>
      <span class="user-count">{{ company.users.length }} usuário(s)</span>
    </div>

    <div v-if="company.users.length === 0" class="no-users">
      <p>Nenhum usuário cadastrado</p>
    </div>

    <div v-else class="users-list">
      <div 
        v-for="(user, index) in company.users" 
        :key="index" 
        class="user-item"
      >
        <span class="user-name">{{ user }}</span>
        <button 
          class="delete-btn"
          @click="$emit('confirm-delete', user)"
          :disabled="deletingUser === user"
          :title="'Excluir ' + user"
        >
          <i class="pi pi-trash" v-if="deletingUser !== user"></i>
          <i class="pi pi-spinner pi-spin" v-else></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanySection',
  props: {
    company: {
      type: Object,
      required: true
    },
    deletingUser: {
      type: String, // Ou o tipo correto do ID/nome do usuário
      default: null
    }
  },
  emits: ['confirm-delete']
}
</script>

<style scoped>
.company-section {
  margin-bottom: 16px;
  border: 1px solid #e0e6ed;
  border-radius: 6px;
  overflow: hidden;
}

.company-header {
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e6ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.company-header h3 {
  margin: 0;
  font-family: 'SnowUI', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.user-count {
  font-size: 11px;
  color: #666;
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
}

.no-users {
  padding: 16px;
  text-align: center;
  color: #666;
  font-style: italic;
  font-size: 12px;
}

.users-list {
  display: flex;
  flex-direction: column;
}

.user-item {
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.user-item:last-child {
  border-bottom: none;
}

.user-name {
  font-weight: 500;
  color: #333;
  font-family: 'SnowUI', system-ui, sans-serif;
  font-size: 13px;
}

.delete-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 6px;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background-color: #f8d7da;
}

.delete-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>