<template>
  <div class="card-full">
    <Card class="custom-card">
      <template #title>
        <h2>Cadastro de termo de privacidade</h2>
      </template>

      <template #content>
        <div class="form-grid">
          <!-- Data de Vigência -->
          <div class="form-field">
            <label for="validity_date">Data de Vigência</label>
            <DatePicker
              v-model="validity_date"
              showIcon
              fluid
              :showOnFocus="false"
              dateFormat="dd/mm/yy"
              placeholder="Selecione a data"
            />
          </div>

          <!-- Checkbox obrigatório -->
          <div class="form-field">
            <label for="is_mandatory">Obrigatório</label>
            <Checkbox v-model="is_mandatory" :binary="true" />
          </div>

          <!-- Texto formatado -->
          <div class="form-field full-width">
            <label for="text">Texto do Termo</label>
            <Editor
              v-model="text"
              editorStyle="height: 400px; font-size: larger"
              placeholder="Digite o texto do termo..."
            />
          </div>

          <!-- Botão -->
          <div class="form-actions">
            <Button
              label="Salvar"
              icon="pi pi-check"
              class="p-button-success"
              @click="saveTerm"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card  from "primevue/card";
import DatePicker from "primevue/datepicker";
import Checkbox from "primevue/checkbox";
import Editor from "primevue/editor";
import Button from "primevue/button";

export default {
  name: "FormsPrivacy",
  components: { Card, DatePicker, Checkbox, Editor, Button },
  data() {
    return {
      validity_date: "",
      is_mandatory: false,
      text: ""
    };
  },
  methods: {
    saveTerm() {
      const payload = {
        validity_date: this.validity_date,
        is_mandatory: this.is_mandatory,
        text_html: this.text
      };
      
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
  width: 100%;
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

.full-width {
  grid-column: span 2;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
label{
    font-size: larger
}
</style>
