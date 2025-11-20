<template>
    <DefaultLayout>
        <FormsPrivacy @create="getAllPrivacies" />
        <template v-if="is_loading">
            <Skeleton width="100%" height="500px"></Skeleton>
        </template>
        <template v-else>
            <TablePrivacyPolicy :policies="policies" />

        </template>
    </DefaultLayout>

</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ChartAILine from '@/components/ChartAILine.vue';
import FormsPrivacy from '@/components/FormsPrivacy.vue';
import TablePrivacyPolicy from '@/components/TablePrivacyPolicy.vue';
import { PrivacyPolicyService } from '@/services/PrivacyPolicyService';
import { showToast } from '@/eventBus';
import { Skeleton } from 'primevue';
export default {
    name: 'PrivacyPolicyView',
    components: {
        DefaultLayout,
        ChartAILine,
        FormsPrivacy,
        TablePrivacyPolicy
    },
    data() {
        return {
            is_loading: false,
            policies: [],
            servicePolicy: new PrivacyPolicyService()
        }
    },
    methods: {

        async getAllPrivacies() {
            this.is_loading = true;
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
            this.is_loading = false;
        }

    },
    async mounted() {
        await this.getAllPrivacies();

    }

}
</script>

<style scoped></style>