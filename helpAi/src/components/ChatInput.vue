<template>
  <div class="chat-input">
    <div class="input-group">
      <InputText
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        placeholder="Digite para buscar tickets..."
        @keydown.enter="$emit('enviar')"
        :disabled="digitando"
      />
      <Button
        @click="$emit('enviar')"
        :disabled="!modelValue.trim() || digitando"
        :loading="digitando"
        class="send-btn"
      >
        <i class="pi pi-send" v-if="!digitando"></i>
      </Button>
    </div>
  </div>
</template>

<script>
import { InputText } from 'primevue';
import { Button } from 'primevue';
export default {
  name: 'ChatInput',
  components: {
    Button,
    InputText
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    digitando: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'enviar']
}
</script>

<style scoped>
.chat-input {
  padding: 20px;
  background: white;
  border-top: 1px solid #e0e7ff;
}

.input-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.p-inputtext {
  flex: 1;
  border-radius: 20px;
  padding: 12px 16px;
  border: 2px solid #e0e7ff;
  transition: border-color 0.3s ease;
}


.p-inputtext:focus {
  border-color: #c3d1d47d !important;
  outline: none;
}

.send-btn {
  border-radius: 50% !important;
  width: 44px !important;
  height: 44px !important;
  background: linear-gradient(135deg, #2196F3, #21CBF3) !important;
  border: none !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.3s ease;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(53, 51, 205, 0.3);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn i {
  font-size: 16px;
  color: white;
  transform: rotate(-45deg);
}
</style>