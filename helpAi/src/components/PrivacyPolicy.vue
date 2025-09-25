<template>
  <Dialog v-model:visible="isVisible" modal :closable="false" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="p-dialog-mask">
    <template #header>
      <div class="header-content">
        <h2>Termo de Privacidade</h2>
      </div>
    </template>

    <div class="privacy-content">

      <div v-html="privacyText"></div>

      <div v-if="effectiveDate" class="effective-date">
        <strong>Data de vigência:</strong> {{ formatDate(effectiveDate) }}
      </div>
      <div class="checkbox-container">
        <Checkbox v-model="hasAccepted" :binary="true" input-id="accept-terms" />
        <label for="accept-terms" class="checkbox-label">
          Li e aceito os termos de privacidade
        </label>
      </div>
    </div>

    <template #footer>
      <div class="footer-content">


        <div class="footer-buttons">

          <Button label="Aceitar" icon="pi pi-check" :disabled="!hasAccepted" @click="acceptTerms"
            :loading="isloading" />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { PrivacyPolicyService } from '@/services/PrivacyPolicyService'

export default defineComponent({
  name: 'PrivacyModal',
  components: {
    Dialog,
    Button,
    Checkbox
  },
  data() {
    return {
      privacyText: localStorage.getItem('TextoTermoAtual'),
      hasAccepted: false,
      effectiveDate: localStorage.getItem('DataVigenciaTermo'),
      privacyService: new PrivacyPolicyService(),
      isloading: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible', 'accept'],
  computed: {
    isVisible: {
      get(): boolean {
        return this.visible
      },
      set(value: boolean) {
        this.$emit('update:visible', value)
        localStorage.setItem('termoExpirado', String(false));
        if (!value) {
          this.hasAccepted = false
        }
      }
    }
  },
  methods: {
    async acceptTerms() {
      this.isloading = true;
      try {
        await this.privacyService.acceptPolicy({
          userid: Number(localStorage.getItem('userId')),
          privacyid: Number(localStorage.getItem('idPolicy'))
        })
        this.$emit('accept')
        this.isVisible = false;
      }catch(error: any){
        console.log('error - adicionar toast')
      }
      
      this.isloading = false;
    },
    formatDate(date: string | Date): string {
      if (!date) return ''

      const dateObj = typeof date === 'string' ? new Date(date) : date

      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(dateObj)
    }
  }
})
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}

.header-content h2 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.effective-date {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border-left: 4px solid #007bff;
  font-size: 0.9rem;
}

.privacy-content {
  line-height: 1.6;
  max-height: 400px;
  overflow-y: auto;
}

.privacy-content h3 {
  color: #34495e;
  font-size: 1.1rem;
  margin: 1.5rem 0 0.5rem 0;
  font-weight: 600;
}

.privacy-content h3:first-child {
  margin-top: 0;
}

.privacy-content p {
  margin: 0 0 1rem 0;
  color: #555;
  text-align: justify;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.checkbox-label {
  font-size: 0.95rem;
  color: #495057;
  cursor: pointer;
  user-select: none;
}

.footer-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.footer-buttons :deep(.p-button:not(.p-button-secondary)) {
  background: linear-gradient(135deg, #2196F3, #21CBF3);
  border-color: #2196F3;
}

.footer-buttons :deep(.p-button:not(.p-button-secondary):hover:not(:disabled)) {
  background: linear-gradient(135deg, #1976D2, #1BB5E0);
  border-color: #1976D2;
}

:global(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.3) !important;
}

:global(.p-dialog) {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  background-color: white !important;
}
</style>