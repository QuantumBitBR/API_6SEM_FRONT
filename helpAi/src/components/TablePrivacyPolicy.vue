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
    props: {
        policies: {
            type: Array,
            required: true
        }

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