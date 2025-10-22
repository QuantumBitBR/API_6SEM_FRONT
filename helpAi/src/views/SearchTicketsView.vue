<template>
  <DefaultLayout>
    <div class="ticket-chat-container">
      <ChatHeader :tickets-count="ticketsEncontrados.length" title="Busca de Tickets"
        subtitle="Digite palavras-chave para encontrar tickets" />

      <ChatMessages :mensagens="mensagens" :digitando="digitando" @visualizar-ticket="visualizarTicket" />

      <ChatInput v-model="mensagemInput" :digitando="digitando" @enviar="enviarMensagem" />

      <TicketDialog v-model:visible="dialogTicketVisible" :ticket="ticketSelecionado" />
    </div>
  </DefaultLayout>

</template>

<script>
import ChatHeader from '@/components/ChatHeader.vue'
import ChatMessages from '@/components/ChatMessages.vue'
import ChatInput from '@/components/ChatInput.vue'
import TicketDialog from '@/components/TicketDialog.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { TicketSearchService } from '@/services/TicketSearchService'

export default {
  name: 'TicketSearchChat',
  components: {
    ChatHeader,
    ChatMessages,
    ChatInput,
    TicketDialog,
    DefaultLayout
  },

  data() {
    return {
      mensagemInput: '',
      mensagens: [],
      digitando: false,
      dialogTicketVisible: false,
      ticketSelecionado: null,
      ticketsEncontrados: []
    }
  },

  methods: {
    async enviarMensagem() {
      if (!this.mensagemInput.trim()) return

      const mensagem = this.mensagemInput.trim()

      this.mensagens.push({
        tipo: 'user',
        texto: mensagem
      })

      this.mensagemInput = ''
      this.digitando = true

      await new Promise(resolve => setTimeout(resolve, 1000))

      const ticketsEncontrados = await this.buscarTickets(mensagem)
      this.ticketsEncontrados = ticketsEncontrados

      this.mensagens.push({
        tipo: 'bot',
        tickets: ticketsEncontrados,
        texto: ticketsEncontrados.length === 0 ? `Não encontrei tickets para "${mensagem}"` : null
      })

      this.digitando = false
    },

    async buscarTickets(busca) {
      const service = new TicketSearchService()

      try {

        const ticketsFromAPI = await service.searchTickets(busca)
        if (!ticketsFromAPI || ticketsFromAPI.length === 0) {
          return []
        }

        return ticketsFromAPI.map(ticket => ({
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

      } catch (error) {
        console.error('Erro ao buscar tickets:', error)
        return []
      }
    },

    visualizarTicket(ticket) {
      this.ticketSelecionado = ticket
      this.dialogTicketVisible = true
    }
  }
}
</script>

<style scoped>
.ticket-chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .ticket-chat-container {
    height: 100vh;
    border-radius: 0;
  }
}
</style>