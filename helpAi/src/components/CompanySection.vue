<template>
  <div class="company-section">
    <div class="company-header" @click="toggleExpansion">
      <h3>{{ company.company_name }}</h3>
      <div class="header-details">
        <span class="user-count">{{ company.users.length }} usuário(s)</span>
        <span 
          class="toggle-icon" 
          :class="{ 'rotated': isExpanded }"
        >
          &#9660; </span>
      </div>
    </div>

    <div v-show="isExpanded">
      <div v-if="loading" class="loading-users">
          <Skeleton height="30px" class="user-item-skeleton"></Skeleton>
          <Skeleton height="30px" class="user-item-skeleton"></Skeleton>
          <Skeleton height="30px" class="user-item-skeleton"></Skeleton>
      </div>

      <div v-else>
        <div v-if="company.users.length === 0" class="no-users">
          <p>Nenhum usuário cadastrado</p>
        </div>

        <div v-else class="users-list">
          <div 
            v-for="(user, index) in company.users" 
            :key="index" 
            class="user-item"
          >

          <span class="user-name">{{user.fullname}}</span>
            <button 
              class="delete-btn" 
              @click="$emit('confirm-delete', user)" 
              :disabled="deletingUser === user"
              >
              <img src="../images/lixeira.png" alt="Excluir" class="trash-icon" />
            </button>
          </div>
        </div>  
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
      type: Number,
      default: null
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    toggleExpansion() {
      this.isExpanded = !this.isExpanded;
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
  border-bottom: none;
}

.header-details {
  display: flex;
  align-items: center;
  gap: 10px; 
}

.toggle-icon {
  transition: transform 0.3s ease-in-out;
  font-size: 10px;
  color: #666;
  padding-left: 5px;
  cursor: pointer;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.company-header h3 {
  margin: 0;
  font-family: 'SnowUI', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.user-count {
  font-size: 17px;
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
  font-size: 14px;
}

.delete-btn {
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 3px;
  transition: all 0.2s ease;
  background-color: transparent;
}

.trash-icon{
  width: 20px;
  height: 20px;
  justify-content: center;
}

</style>