<template>
    <Dialog v-model:visible="dialogVisible" modal header="Adicionar Usuário" :style="{ width: '30rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        
        <div class="form-content">
            <div class="field">
                <label for="name">Nome</label>
                <InputText id="name" v-model="localName" placeholder="Digite o nome" class="w-full" />
            </div>

            <div class="field">
                <label for="role">Cargo</label>
                <InputText id="role" v-model="localRole" placeholder="Digite o cargo" class="w-full" />
            </div>

            <div class="actions">
                <Button label="Cancelar" severity="secondary" @click="dialogVisible = false" />
                <Button label="Salvar" @click="save" />
            </div>
        </div>
    </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { UserAuthService } from '@/services/UserAuthService';
import { showToast } from '@/eventBus';

export default {
    name: 'UserDialog',

    components: { Dialog, InputText, Button },

    props: {
        visible: { type: Boolean, default: false },
        name: { type: String, default: '' },
        role: { type: String, default: '' },
        id: { type: Number, default: null }
    },

    data() {
        return {
            localName: this.name,
            localRole: this.role,
            localId: this.id,
            userService: new UserAuthService()
        };
    },

    computed: {
        dialogVisible: {
            get() { return this.visible; },
            set(v) { this.$emit("update:visible", v); }
        }
    },

    watch: {
        name(newVal) {
            this.localName = newVal;
        },
        role(newVal) {
            this.localRole = newVal;
        },
        id(newVal) {
            this.localId = newVal;
        }
    },

    methods: {
        save() {
            console.log('Nome:', this.localName);
            console.log('Cargo:', this.localRole);
            console.log('ID:', this.localId);
            
            this.changeUser();            
            
            this.dialogVisible = false;
        },

        async changeUser(){
            try {
                const response = await this.userService.modifyUserData(this.localId, this.localName, this.localRole);
                if(response){
                    showToast({
                        severity: 'success',
                        summary: 'Alteração de Usuário',
                        detail: "Dados alterados com sucesso!",
                        life: 3000
                    });
                }
            } catch (error) {
                console.error('Erro ao salvar usuário:', error);
            }
        }
    }
};
</script>

<style scoped>
.form-content {
    padding: 20px 0;
}

.field {
    margin-bottom: 20px;
}

.field label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #e0e6ed;
}
</style>