<template>
  <Dialog 
    v-model:visible="internalVisible"
    header="Tickets relacionados"
    modal
    :style="{ width: '700px', height: '800px' }"
  >
    <div class="tickets-container">
      <TicketsResults 
        :tickets="ticketsMock"
        @visualizar-ticket="abrirDetalhes"
      />
    </div>
  </Dialog>

  <TicketDialog
    v-model:visible="mostrarDetalhes"
    :ticket="ticketSelecionado"
  />
</template>

<script>
import TicketsResults from './TicketsResults.vue'
import TicketDialog from './TicketDialog.vue'
import { Dialog } from 'primevue'
import { Button } from 'primevue'

export default {
  name: 'TicketsDialog',

  components: { Dialog, TicketsResults, TicketDialog, Button },

  props: {
    visible: {
      type: Boolean,
      default: false
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

      ticketsMock: [
        { 
          ticketid: 1, 
          titulo: 'Erro ao carregar painel', 
          descricao: 'Ao abrir o dashboard aparece erro 500.', 
          prioridade: 'Alta', 
          status: 'Aberto',
          produto: 'Dashboard',
          solicitante: 'Empresa A',
          categoria: 'Bug',
          subcategoria: 'Interface',
          dispositivo: 'Desktop',
          canal: 'Web'
        },
        { 
          ticketid: 2, 
          titulo: 'Botão desalinhado', 
          descricao: 'O botão de salvar não está centralizado.', 
          prioridade: 'Baixa', 
          status: 'Em Andamento',
          produto: 'Formulários',
          solicitante: 'Empresa B',
          categoria: 'Visual',
          subcategoria: 'Layout',
          dispositivo: 'Mobile',
          canal: 'App'
        },
        { 
          ticketid: 3, 
          titulo: 'Solicitação de acesso', 
          descricao: 'Usuário pede permissão para módulo financeiro.', 
          prioridade: 'Média', 
          status: 'Fechado',
          produto: 'Financeiro',
          solicitante: 'Empresa C',
          categoria: 'Acesso',
          subcategoria: 'Permissões',
          dispositivo: 'Desktop',
          canal: 'Email'
        },
        { 
          ticketid: 4, 
          titulo: 'Problema no login', 
          descricao: 'Erro ao autenticar.', 
          prioridade: 'Alta', 
          status: 'Aberto',
          produto: 'Autenticação',
          solicitante: 'Empresa D',
          categoria: 'Bug',
          subcategoria: 'Login',
          dispositivo: 'Desktop',
          canal: 'Web'
        },
        { 
          ticketid: 5, 
          titulo: 'Bug no formulário', 
          descricao: 'Campo não salva.', 
          prioridade: 'Média', 
          status: 'Fechado',
          produto: 'Formulários',
          solicitante: 'Empresa E',
          categoria: 'Bug',
          subcategoria: 'Dados',
          dispositivo: 'Tablet',
          canal: 'App'
        },
        { 
          ticketid: 6, 
          titulo: 'Lentidão geral', 
          descricao: 'Sistema demora a responder.', 
          prioridade: 'Crítica', 
          status: 'Aberto',
          produto: 'Sistema',
          solicitante: 'Empresa F',
          categoria: 'Performance',
          subcategoria: 'Velocidade',
          dispositivo: 'Desktop',
          canal: 'Web'
        },
        { 
          ticketid: 7, 
          titulo: 'Acesso negado', 
          descricao: 'Usuário não consegue abrir relatórios.', 
          prioridade: 'Média', 
          status: 'Em Andamento',
          produto: 'Relatórios',
          solicitante: 'Empresa G',
          categoria: 'Acesso',
          subcategoria: 'Permissões',
          dispositivo: 'Desktop',
          canal: 'Web'
        }
      ]
    }
  },

  methods: {
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
  max-height: 500px;
}

.tickets-container {
  overflow-y: auto;
  padding: 15px;
}
</style>