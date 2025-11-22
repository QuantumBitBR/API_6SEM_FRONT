<template>
  <Dialog v-model:visible="internalVisible" header="Tickets relacionados" modal :style="{ width: '1000px' }">
    <div class="tickets-container">
      <div v-if="loading" class="loading-state">
        <Skeleton width="100%" height="500px"></Skeleton>
        
      </div>

      <div v-else-if="tickets.length === 0" class="empty-state">
        <i class="pi pi-inbox" style="font-size: 3rem"></i>
        <p>Nenhum ticket encontrado</p>
      </div>

      <div v-else>
        <TicketsResults :tickets="tickets" @visualizar-ticket="abrirDetalhes" />

        <Paginator v-if="totalRecords > 50" :rows="50" :totalRecords="totalRecords" :first="first" @page="onPageChange"
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" />
      </div>
    </div>
  </Dialog>

  <TicketDialog v-model:visible="mostrarDetalhes" :ticket="ticketSelecionado" />
</template>

<script>
import TicketsResults from './TicketsResults.vue'
import TicketDialog from './TicketDialog.vue'
import { Dialog, ProgressSpinner } from 'primevue'
import { TicketService } from '@/services/TicketsService'
import { showToast } from '@/eventBus'
import { Paginator } from 'primevue'
import {Skeleton} from 'primevue'
export default {
  name: 'TicketsDialog',

  components: { Dialog, TicketsResults, TicketDialog, Paginator, ProgressSpinner, Skeleton },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['update:visible'],

  computed: {
    internalVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },

  data() {
    return {
      ticketSelecionado: null,
      mostrarDetalhes: false,
      tickets: [],
      loading: false,
      currentPage: 1,
      totalRecords: 0,
      first: 0,
      ticketService: new TicketService()
    }
  },

  watch: {
    visible(newVal) {
      if (newVal) {
        this.currentPage = 1
        this.first = 0
        this.getRelatedTickets()
      }
    }
  },

  methods: {
    async getRelatedTickets() {
      try {
        this.loading = true

        const params = {
          ...this.filters,
          page: this.currentPage,
          limit: 50
        }

        const response = await this.ticketService.getRelatedTickets(params)

        this.tickets = response.data.map(ticket => ({
          ticketid: ticket.ticketid,
          titulo: ticket.title || 'Título não informado',
          descricao: ticket.description || 'Descrição não disponível',
          status: ticket.status_name || 'Não informado',
          prioridade: ticket.priority_name || 'Não informado',
          categoria: ticket.category_name || 'Não informado',
          subcategoria: ticket.subcategory_name || '',
          solicitante: ticket.company_name || 'Não informado',
          produto: ticket.product_name || 'Não informado',
          canal: ticket.channel || 'Não informado',
          dispositivo: ticket.device || 'Não informado'
        }))
        this.totalRecords = response.total_pages

      } catch (error) {
        console.error('Erro ao buscar tickets relacionados:', error)
        showToast({
          severity: 'error',
          summary: 'Erro ao buscar tickets',
          detail: error.message || 'Não foi possível carregar os tickets',
          life: 3000
        })
        this.tickets = []
        this.totalRecords = 0
      } finally {
        this.loading = false
      }
    },

    onPageChange(event) {
      this.first = event.first
      this.currentPage = event.page + 1
      this.getRelatedTickets()
    },

    abrirDetalhes(ticket) {
      this.ticketSelecionado = ticket
      this.mostrarDetalhes = true
    }
  }
}
</script>

<style scoped>
:deep(.p-dialog-content) {
  padding: 0 !important;
  min-height: 400px;
}

.tickets-container {
  padding: 15px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: #6c757d;
}

.loading-state p,
.empty-state p {
  margin-top: 15px;
  font-size: 14px;
}

:deep(.p-paginator) {
  margin-top: 15px;
  padding: 10px 0;
  border-top: 1px solid #e9ecef;
}
</style>