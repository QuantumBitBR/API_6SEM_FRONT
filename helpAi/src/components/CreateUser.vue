<template>
    <div class="create-user-container">
        <Card>
            <template #title>
                <h3>Criar Usuário</h3>
            </template>

            <template #content>
                <div class="p-fluid form-wrapper">

                    <div class="fields-row">

                        <div class="field">
                            <label for="name">Nome <span class="required">*</span></label>
                            <InputText id="name" v-model="form.name" placeholder="Digite o nome completo"
                                class="input-default" />
                        </div>

                        <div class="field">
                            <label for="email">Email <span class="required">*</span></label>
                            <InputText id="email" v-model="form.email" type="email" placeholder="email@email.com"
                                class="input-default" />
                        </div>

                        <div class="field">
                            <label for="role">Cargo <span class="required">*</span></label>
                            <Select id="role" v-model="form.role" :options="roles" optionLabel="label"
                                optionValue="value" placeholder="Selecione a função" class="input-default" />
                        </div>

                    </div>


                    <div class="btn-area">
                        <Button label="Criar Usuário" icon="pi pi-check" @click="submit" />
                    </div>

                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import { Button } from "primevue";
import { Select } from "primevue";
import { InputText } from "primevue";
import { Card } from "primevue";

export default {
    name: "CreateUser",
    components: { Button, Select, InputText, Card },

    data() {
        return {
            form: {
                name: "",
                email: "",
                role: null,
            },

            roles: [
                { label: "AGENTE", value: "AGENTE" },
                { label: "ADMIN", value: "ADMIN" },
                { label: "GESTOR", value: "GESTOR" },
            ],
        };
    },

    methods: {
        submit() {
            console.log("Usuário criado:", this.form);
        },
        cancel() {
            console.log("Cancelado");
        },
    },
};
</script>

<style scoped>
.create-user-container {
    width: 90%;
    margin: auto;
    margin-bottom: 12px;
    border-radius: 12px;
    padding: 5px;

}

.input-default {
    width: 600px;
    /* tamanho padrão */
    max-width: 100%;
    /* evita quebrar em telas pequenas */
}

h3 {
    margin: 0;
    font-weight: 600;
    font-size: 1.5rem;
    color: #495057;
}

.form-wrapper {
    padding: 0.5rem 1rem;
}

.fields-row {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.field {
  flex: 1; /* cada campo ocupa espaço igual */
}

.input-default {
  width: 100%;
}

.field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #495057;
    font-size: 0.95rem;
}

.required {
    color: #e24c4c;
}

.btn-area {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #e9ecef;
}
</style>