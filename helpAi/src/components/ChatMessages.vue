<template>
  <div class="chat-messages" ref="messagesContainer">
    <!-- Boas-vindas -->
    <div class="message bot" v-if="mensagens.length === 0">
      
      <img src="/HelpAI - Agente.svg" alt="Bot Avatar" class="chat-bot"/>
    
      <div class="bubble">
        Olá! 👋 Digite palavras-chave, frases ou descrições para encontrar tickets.
      </div>
    </div>

    <ChatMessage
      v-for="(mensagem, index) in mensagens"
      :key="index"
      :mensagem="mensagem"
      @visualizar-ticket="$emit('visualizar-ticket', $event)"
    />

    <div v-if="digitando" class="message bot">
      <Avatar icon="pi pi-robot" shape="circle" />
      <div class="bubble typing">
        <div class="dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar } from 'primevue'
import ChatMessage from './ChatMessage.vue'

export default {
  name: 'ChatMessages',
  components: {
    ChatMessage,
    Avatar
  },
  props: {
    mensagens: {
      type: Array,
      default: () => []
    },
    digitando: {
      type: Boolean,
      default: false
    }
  },
  emits: ['visualizar-ticket'],
  
  watch: {
    mensagens: {
      handler() {
        this.$nextTick(() => this.scrollToBottom())
      },
      deep: true
    }
  },
  
  methods: {
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }
  }
}
</script>

<style scoped>
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8f9ff;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
.message {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  max-width: 80%;
}

.message.bot {
  align-self: flex-start;
}

.bubble {
  background: white;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #e0e7ff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.p-avatar {
  background: linear-gradient(135deg, #2196F3, #21CBF3);
  color: white;
}

/* Digitando */
.typing .dots {
  display: flex;
  gap: 4px;
}

.dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2196F3;
  animation: typing 1s infinite;
}

.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}

@media (max-width: 768px) {
  .message {
    max-width: 95%;
  }
}
</style>