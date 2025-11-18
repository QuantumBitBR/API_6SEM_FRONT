<template>
  <div class="card-full">
    <Card class="custom-card">
      <template #title>
        <h2>Cadastro de termo de Condições do Termo de Consentimento</h2>
      </template>

      <template #content>
        <p class="info-message">
          Preencha as informações abaixo para cadastrar uma nova condição ao termo de consentimento. 
          O campo de texto permite formatação avançada.
        </p>

        <div class="form-grid">

          <div class="form-field">
            <label for="is_mandatory">Obrigatório</label>
            <Checkbox v-model="is_mandatory" :binary="true" />
          </div>

          <div class="form-field full-width">
            <label for="text">Texto do Termo</label>
            <Editor v-model="text" editorStyle="height: 400px; font-size: larger"
              placeholder="Digite o texto do termo..." />
          </div>

          
        </div>
        <div class="form-actions">
            <Button label="Salvar" icon="pi pi-check" class="p-button-success" @click="saveTerm" />

          </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "primevue/card";
import DatePicker from "primevue/datepicker";
import Checkbox from "primevue/checkbox";
import Editor from "primevue/editor";
import Button from "primevue/button";
import { PrivacyPolicyService } from "@/services/PrivacyPolicyService";
import { showToast } from '@/eventBus'

export default {
  name: "FormsPrivacy",
  components: { Card, DatePicker, Checkbox, Editor, Button },
  data() {
    return {
      is_mandatory: false,
      text: "",
      servicePolicy: new PrivacyPolicyService()
    };
  },
  methods: {
    async saveTerm() {
      if (this.text == ""){
        showToast({
          severity: 'warn',
          summary: 'Termo de privacidade',
          detail: "O campo de texto não pode ser nulo ou vazio.",
          life: 3000
        });
        return
      }

      const payload = {
        is_mandatory: this.is_mandatory,
        text: this.text
      };

      try {
        await this.servicePolicy.create(payload);
        this.$emit("create");
        showToast({
          severity: 'success',
          summary: 'Termo de privacidade',
          detail: "Termo de privacidade criado com sucesso!",
          life: 3000
        });

      } catch (error) {
        showToast({
          severity: 'error',
          summary: 'Erro ao criar o termo de privacidade',
          detail: error.message,
          life: 3000
        });
      }
      this.text = "";
      this.is_mandatory = false;
    }
  }
};
</script>

<style scoped>
.card-full {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.custom-card {
  width: 90%;
  padding-inline: 20px;
  max-width: 1200px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
}

.info-message {
  background-color: #eef6ff;
  color: #084298;
  border-left: 4px solid #0d6efd;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.form-grid {
  display: grid;
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-label {
  font-size: 0.95rem;
  color: #555;
}

.full-width {
  grid-column: span 2;
}

.form-actions {
  display: flex;
  justify-content: center; /* <-- Centraliza horizontalmente */
  align-items: center;     /* <-- Garante alinhamento vertical */
  margin-top: 2rem;
  width: 100%;
}

label {
  font-size: larger;
  font-weight: 500;
}
</style>