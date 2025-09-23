<template>
  <div class="confirm-overlay" @click.self="$emit('cancel')">
    <div class="confirm-dialog">
      <h3>Confirmar Exclusão</h3>
      <p>Tem certeza que deseja excluir o usuário <strong>{{ userToDelete }}</strong>?</p>
      <div class="confirm-actions">
        <button class="btn-cancel" @click="$emit('cancel')">Cancelar</button>
        <button class="btn-confirm" @click="$emit('confirm')" :disabled="deletingUser !== null">
          <span v-if="deletingUser === null">Excluir</span>
          <span v-else>Excluindo...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    userToDelete: {
      type: String,
      required: true
    },
    deletingUser: {
      type: String,
      default: null
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
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* Um z-index alto para ficar acima de todos os outros elementos, incluindo o modal principal */
}

.confirm-dialog {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.confirm-dialog h3 {
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  color: #333;
}

.confirm-dialog p {
  margin: 0 0 20px 0;
  color: #666;
  font-size: 14px;
}

.confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel, .btn-confirm {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  font-size: 13px;
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
</style>