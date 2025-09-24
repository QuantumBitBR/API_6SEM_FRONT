<template>
  <div class="message" :class="mensagem.tipo">
    <div v-if="mensagem.tipo === 'bot'" class="bot-avatar">
      <img src="/HelpAI - Agente.svg" alt="Bot Avatar" class="chat-bot"/>
    </div>
    
    <div class="bubble">
      <p v-if="mensagem.texto">{{ mensagem.texto }}</p>
      
      <TicketsResults
        v-if="mensagem.tickets && mensagem.tickets.length > 0"
        :tickets="mensagem.tickets"
        @visualizar-ticket="$emit('visualizar-ticket', $event)"
      />

      <div v-if="mensagem.tickets && mensagem.tickets.length === 0" class="no-results">
        <i class="pi pi-search"></i>
        <p>Nenhum ticket encontrado. Tente outras palavras-chave.</p>
      </div>
    </div>

    <Avatar 
      v-if="mensagem.tipo === 'user'"
      icon="pi pi-user" 
      shape="circle" 
      class="user-avatar"
    />
  </div>
</template>

<script>
import { Avatar } from 'primevue';
import TicketsResults from './TicketsResults.vue'
import HelpAIComponent from './HelpAIComponent.vue'

export default {
  name: 'ChatMessage',
  components: {
    TicketsResults,
    Avatar,
    HelpAIComponent
  },
  props: {
    mensagem: {
      type: Object,
      required: true
    }
  },
  emits: ['visualizar-ticket']
}
</script>

<style scoped>
.message {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  max-width: 80%;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message.bot {
  align-self: flex-start;
}

.bot-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-bot {
  width: 70px; /* ajuste o tamanho aqui */
  height: 70px;
  object-fit: contain; /* garante que o SVG não distorça */
}

.bubble {
  background: white;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #e0e7ff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.message.user .bubble {
  background: linear-gradient(135deg, #4fc7ff, #409fcb);
  color: white;
  border: none;
}

.p-avatar {
  background: linear-gradient(135deg, #2196F3, #21CBF3);
  color: white;
}

.user-avatar {
  background: linear-gradient(135deg, #4fc7ff, #409fcb) !important;
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #666;
}

.no-results i {
  font-size: 32px;
  margin-bottom: 10px;
  opacity: 0.5;
}
</style>
