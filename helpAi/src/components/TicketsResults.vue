<template>
  <div class="tickets-results">
    <div class="results-header">
      <i class="pi pi-search"></i>
      <span>{{ tickets.length }} ticket(s) encontrado(s):</span>
    </div>
    
    <div class="tickets-grid">
      <TicketCard
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
        @click="$emit('visualizar-ticket', ticket)"
      />
    </div>
  </div>
</template>

<script>
import TicketCard from './TicketCard.vue'

export default {
  name: 'TicketsResults',
  components: {
    TicketCard
  },
  props: {
    tickets: {
      type: Array,
      default: () => []
    }
  },
  emits: ['visualizar-ticket']
}
</script>

<style scoped>
.results-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #2196F3;
}

.tickets-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

@media (max-width: 768px) {
  .tickets-grid {
    grid-template-columns: 1fr;
  }
}
</style>
