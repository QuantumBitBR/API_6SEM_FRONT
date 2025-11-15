<template>
  <Dialog v-model:visible="isVisible" modal :closable="false" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="p-dialog-mask">
    <template #header>
      <div class="header-content">
        <div class="head">
          <div class="title">
            <h2>Termo de Privacidade</h2>
          </div>
          <Message severity="error" v-if="is_mandatory">*Obrigatório: Para continuar, é necessário aceitar o termo de privacidade. Caso não concorde, seu usuário será removido do sistema.</Message>
          <Message severity="info" v-else >Opcional: Opcional: Você pode avançar sem aceitar o termo de privacidade, mas algumas funcionalidades podem ficar limitadas.</Message>
          
        </div>

        <Avatar icon="pi pi-times" class="close-avatar" @click="closePopup" v-if="!is_mandatory" />
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
          <Button label="Negar" icon="pi pi-times" @click="askForDeliting"
            :loading="isloading" class="button-negar" v-if="is_mandatory"/>

          <Button label="Aceitar" icon="pi pi-check" :disabled="!hasAccepted" @click="acceptTerms"
            :loading="isloading" />
        </div>
      </div>
    </template>
  </Dialog>
  <ConfirmDelete :text="message_delete" v-if="show_confirm_delete" @cancel="cancelDelete" @confirm="confirmDelete" :is_loading="isloading" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { PrivacyPolicyService } from '@/services/PrivacyPolicyService'
import { showToast } from '@/eventBus'
import { Avatar } from 'primevue'
import {Message} from 'primevue'
import ConfirmDelete from './ConfirmDelete.vue'
import {UserService} from '@/services/UserService'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PrivacyModal',
  components: {
    Dialog,
    Button,
    Checkbox,
    Avatar,
    Message, 
    ConfirmDelete
  },
  data() {
    return {
      privacyText: localStorage.getItem('TextoTermoAtual'),
      hasAccepted: false,
      effectiveDate: localStorage.getItem('DataVigenciaTermo'),
      privacyService: new PrivacyPolicyService(),
      isloading: false,
      is_mandatory: true ? localStorage.getItem("is_mandatory") == "true": false,
      show_confirm_delete: false,
      message_delete: 'Ao negar o termo de privacidade, seu acesso ao sistema será encerrado e seus dados de usuário serão removidos. Deseja realmente continuar?',
      userService: new UserService(),
      router: useRouter()
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
        showToast({
          severity: 'success',
          summary: 'Termo de privacidade',
          detail: "Termo aceito com sucesso!",
          life: 3000
        });
      } catch (error: any) {
        showToast({
          severity: 'error',
          summary: 'Erro ao aceitar o termo de privacidade',
          detail: error.message,
          life: 3000
        });
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
    },
    closePopup() {
      this.$emit('accept')
      this.isVisible = false;
    },
    askForDeliting(){
      this.$emit('accept')
      this.show_confirm_delete = true
    },
    cancelDelete(){
      this.show_confirm_delete = false
      this.$emit('accept')
    },
    async confirmDelete(){
      this.isloading = true;
      try{
        const id_user = localStorage.getItem('userId')
        await this.userService.deleteById(Number(id_user))
        this.router.push('/');

        this.isVisible = false;
        this.show_confirm_delete = false;
        showToast({
          severity: 'warn',
          summary: 'Alerta',
          detail: "Usuário deletado",
          life: 3000
        });
      }catch(error : any){
        
        showToast({
          severity: 'error',
          summary: 'Erro ao aceitar o termo de privacidade',
          detail: error.message,
          life: 3000
        });
      }
      localStorage.clear()
      this.isloading = false;
    }
  }
})
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}
.button-negar{
  background-color: red;
}
.title{
  margin-bottom: 1em;
}

.header-content h2 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;

}

.header-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  max-height: 600px;
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


.footer-buttons > button{
  border: none
}
.button-negar:hover {
  background-color: #b02a37 !important;
  border-color: #b02a37 !important;
}
:global(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.3) !important;
    padding: 2em 1em;
}

:global(.p-dialog) {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  background-color: white !important;
}

.close-avatar {
  cursor: pointer
}
</style>