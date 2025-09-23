<template>
  <div class="ticket-chat-container">
    <ChatHeader 
      :tickets-count="ticketsEncontrados.length"
      title="Busca de Tickets"
      subtitle="Digite palavras-chave para encontrar tickets"
    />

    <ChatMessages 
      :mensagens="mensagens"
      :digitando="digitando"
      @visualizar-ticket="visualizarTicket"
    />

    <ChatInput 
      v-model="mensagemInput"
      :digitando="digitando"
      @enviar="enviarMensagem"
    />

    <TicketDialog 
      v-model:visible="dialogTicketVisible"
      :ticket="ticketSelecionado"
    />
  </div>
</template>

<script>
import ChatHeader from '@/components/ChatHeader.vue'
import ChatMessages from '@/components/ChatMessages.vue'
import ChatInput from '@/components/ChatInput.vue'
import TicketDialog from '@/components/TicketDialog.vue'

export default {
  name: 'TicketSearchChat',
  components: {
    ChatHeader,
    ChatMessages,
    ChatInput,
    TicketDialog
  },
  
  data() {
    return {
      mensagemInput: '',
      mensagens: [],
      digitando: false,
      dialogTicketVisible: false,
      ticketSelecionado: null,
      ticketsEncontrados: [],
      
      ticketsDatabase: [
        {
          id: 1234,
          titulo: 'Erro de login no sistema',
          descricao: 'Usuário não consegue fazer login na aplicação',
          descricaoCompleta: 'O usuário relatou que ao tentar fazer login no sistema com suas credenciais válidas, recebe uma mensagem de erro "Credenciais inválidas". O problema começou hoje pela manhã.',
          status: 'Aberto',
          prioridade: 'Alta',
          categoria: 'Acesso',
          solicitante: 'João Silva',
          data: new Date('2024-01-15'),
          palavrasChave: ['login', 'erro', 'acesso', 'credenciais']
        },
        {
          id: 5678,
          titulo: 'Problema de conexão com banco de dados',
          descricao: 'Aplicação apresenta lentidão e timeouts',
          descricaoCompleta: 'A aplicação está apresentando lentidão significativa e timeouts frequentes ao tentar acessar o banco de dados.',
          status: 'Em Andamento',
          prioridade: 'Crítica',
          categoria: 'Performance',
          solicitante: 'Maria Santos',
          data: new Date('2024-01-14'),
          palavrasChave: ['conexão', 'banco', 'dados', 'lentidão', 'timeout']
        },
        {
          id: 9101,
          titulo: 'Falha no envio de emails',
          descricao: 'Sistema não está enviando emails de notificação',
          descricaoCompleta: 'O sistema parou de enviar emails de notificação para os usuários.',
          status: 'Fechado',
          prioridade: 'Média',
          categoria: 'Integração',
          solicitante: 'Carlos Oliveira',
          data: new Date('2024-01-10'),
          palavrasChave: ['email', 'notificação', 'envio']
        },
        {
          id: 1122,
          titulo: 'Erro 500 na página de relatórios',
          descricao: 'Página de relatórios retorna erro interno do servidor',
          descricaoCompleta: 'Ao tentar acessar a página de relatórios, os usuários recebem um erro 500.',
          status: 'Aberto',
          prioridade: 'Alta',
          categoria: 'Bug',
          solicitante: 'Ana Costa',
          data: new Date('2024-01-16'),
          palavrasChave: ['erro', '500', 'relatórios', 'servidor']
        }
      ]
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
      
      const ticketsEncontrados = this.buscarTickets(mensagem)
      this.ticketsEncontrados = ticketsEncontrados
      
      this.mensagens.push({
        tipo: 'bot',
        tickets: ticketsEncontrados,
        texto: ticketsEncontrados.length === 0 ? `Não encontrei tickets para "${mensagem}"` : null
      })
      
      this.digitando = false
    },
    
    buscarTickets(busca) {
      const termo = busca.toLowerCase()
      
      return this.ticketsDatabase.filter(ticket => {
        if (termo.includes('#') || /^\d+$/.test(termo)) {
          const numero = termo.replace('#', '')
          return ticket.id.toString().includes(numero)
        }
        
        return ticket.palavrasChave.some(palavra => palavra.includes(termo)) ||
               ticket.titulo.toLowerCase().includes(termo) ||
               ticket.descricao.toLowerCase().includes(termo)
      })
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
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .ticket-chat-container {
    height: 100vh;
    border-radius: 0;
  }
}
</style>