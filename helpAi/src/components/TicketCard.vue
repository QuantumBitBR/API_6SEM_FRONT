<template>
  <Card class="ticket-card" @click="$emit('click')">
    <template #content>
      <div class="ticket-header">
        <Tag :value="ticket.status" :severity="getStatusSeverity(ticket.status)" />
        <span class="ticket-id">#{{ ticket.id }}</span>
      </div>
      <h4>{{ ticket.titulo }}</h4>
      <p>{{ ticket.descricao }}</p>
      <div class="ticket-meta">
        <span><i class="pi pi-calendar"></i> {{ formatarData(ticket.data) }}</span>
        <span class="priority" :class="ticket.prioridade.toLowerCase()">
          {{ ticket.prioridade }}
        </span>
      </div>
    </template>
  </Card>
</template>

<script>
import { Tag } from 'primevue'
import { Card } from 'primevue'

export default {
  name: 'TicketCard',
  components: {
    Card,
    Tag
  },
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  
  methods: {
    getStatusSeverity(status) {
      const map = {
        'Aberto': 'info',
        'Em Andamento': 'warning', 
        'Fechado': 'success'
      }
      return map[status] || 'info'
    },
    
    formatarData(data) {
      return data.toLocaleDateString('pt-BR')
    }
  }
}
</script>

<style scoped>
.ticket-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.ticket-card:hover {
  transform: translateY(-2px);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.ticket-id {
  font-weight: 600;
  color: #666;
}

.ticket-card h4 {
  margin: 0 0 8px 0;
  color: #2196F3;
  font-size: 16px;
}

.ticket-card p {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
}

.ticket-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
}

.priority.crítica { color: #f44336; font-weight: 600; }
.priority.alta { color: #ff9800; font-weight: 600; }
.priority.média { color: #2196F3; font-weight: 600; }
.priority.baixa { color: #4CAF50; font-weight: 600; }
</style>