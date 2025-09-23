<template>
  <div class="chat-header">
    <div class="header-content">
      <i class="pi pi-comments"></i>
      <div>
        <h3>{{ title }}</h3>
        <span>{{ subtitle }}</span>
      </div>
    </div>
 
  </div>
</template>

<script>
import HelpAIComponent from './HelpAIComponent.vue'

export default {
  name: 'ChatHeader',
  components: {

  },
  props: {
    title: {
      type: String,
      default: 'Chat'
    },
    subtitle: {
      type: String,
      default: ''
    },
    ticketsCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.chat-header {
  background: linear-gradient(135deg,  #2196F3, #21CBF3);
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-content i {
  font-size: 24px;
}

.header-content h3 {
  margin: 0;
  font-size: 20px;
}

.header-content span {
  font-size: 14px;
  opacity: 0.9;
}
</style>