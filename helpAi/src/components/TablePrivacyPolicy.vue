<template>
    <div class="content-table-policy">
        <DataTable :value="policies" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" class="table">
            <Column field="validity_date" header="Data de vigência" style="width: 25%"></Column>
            <Column header="Descrição" style="width: 25%">
                <template #body="slotProps">
                    <div v-html="slotProps.data.text"></div>
                </template>
            </Column>

            <Column header="Status" style="width: 25%">
                <template #body="slotProps">
                    <span>
                        {{ slotProps.data.is_mandatory ? "Obrigatório" : "Opcional" }}
                    </span>
                </template>
            </Column>


        </DataTable>
    </div>
</template>

<script>
import { DataTable } from 'primevue';
import { showToast } from '@/eventBus';
import { PrivacyPolicyService } from '@/services/PrivacyPolicyService';
import { Column } from 'primevue';
export default {
    name: 'TablePrivacyPolicy',
    data() {
        return {
            policies: [],
            servicePolicy: new PrivacyPolicyService()
        }
    },
    components: {
        DataTable, Column
    },
    methods: {

        async getAllPrivacies() {
            try {
                this.policies = await this.servicePolicy.getAllPolicies();
            } catch (error) {
                showToast({
                    severity: 'error',
                    summary: 'Atenção',
                    detail: 'Erro ao buscar os dados. Entre em contato com seu administrador.',
                    life: 3000
                });
            }
        }

    },
    async mounted() {
        await this.getAllPrivacies();

    }
}
</script>

<style scoped>
.content-table-policy {
    display: flex;
    justify-content: center;
    padding: 2rem;
}

.table {
    width: 90%;
    max-width: 1200px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
}
</style>