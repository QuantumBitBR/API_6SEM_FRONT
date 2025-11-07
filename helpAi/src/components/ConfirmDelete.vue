<template>
  <div class="confirm-overlay" @click.self="$emit('cancel')">
    <div class="confirm-dialog">
      <h3>Confirmar Exclusão</h3>
      <p>{{ text }}</p>
      <div class="confirm-actions">
        <Button class="btn-cancel" @click="$emit('cancel')">Cancelar</Button>
        <Button class="btn-confirm" @click="$emit('confirm')">
          Excluir
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'primevue';
export default {
  name: 'ConfirmDialog',
  components: {
    Button
  },
  props: {
    text: {
      type: String,
      required: true
    }
  },
  emits: ['cancel', 'confirm']
}
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.3) !important;
  padding: 2em 1em;
}


.confirm-dialog {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  text-align: center;
}

.confirm-dialog h3 {
  margin: 0 0 16px 0;
  font-size: 1.4rem;
  color: #333;
}


.confirm-dialog p {
  margin: 0 0 20px 0;
  color: #666;
  font-size: 16px;
}

.confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-cancel,
.btn-confirm {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s ease;
}

.btn-cancel {
  background: #e9ecef;
  color: #333;
}

.btn-cancel:hover {
  background: #d8dbe0;
}

.btn-confirm {
  background: #dc3545;
  color: #fff;
}

.btn-confirm:hover {
  background: #c0392b;
}

.btn-confirm:disabled {
  background: #f0a3a7;
  cursor: not-allowed;
}

p {
  font-size: 1.1em;
}
</style>