<template>
  <Dialog 
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :style="{width: '600px'}" 
    header="Detalhes do Ticket"
    modal
  >
    <div v-if="ticket">
      <div class="ticket-detail-header">
        <h2>#{{ ticket.id }}</h2>
        <Tag :value="ticket.status" :severity="getStatusSeverity(ticket.status)" />
      </div>
      
      <Divider />
      
      <h3>{{ ticket.titulo }}</h3>
      <p>{{ ticket.descricaoCompleta || ticket.descricao }}</p>
      
      <div class="metadata">
        <div><strong>Criado:</strong> {{ formatarDataCompleta(ticket.data) }}</div>
        <div><strong>Categoria:</strong> {{ ticket.categoria }}</div>
        <div><strong>Solicitante:</strong> {{ ticket.solicitante }}</div>
        <div><strong>Prioridade:</strong> {{ ticket.prioridade }}</div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { Divider } from 'primevue'
import { Dialog } from 'primevue'
export default {
  name: 'TicketDialog',
  components: {
    Divider,
    Dialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    ticket: {
      type: Object,
      default: null
    }
  },
  emits: ['update:visible'],
  
  methods: {
    getStatusSeverity(status) {
      const map = {
        'Aberto': 'info',
        'Em Andamento': 'warning', 
        'Fechado': 'success'
      }
      return map[status] || 'info'
    },
    
    formatarDataCompleta(data) {
      return data.toLocaleString('pt-BR')
    }
  }
}
</script>

<style scoped>
.ticket-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.ticket-detail-header h2 {
  margin: 0;
  color: #2196F3;
}

.metadata {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  margin-top: 20px;
}

.metadata strong {
  color: #2196F3;
  margin-right: 10px;
}
</style>