<template>
    <DefaultLayout>
        <FormsPrivacy />
        <TablePrivacyPolicy />
    </DefaultLayout>

</template>

<script lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ChartAILine from '@/components/ChartAILine.vue';
import FormsPrivacy from '@/components/FormsPrivacy.vue';
import TablePrivacyPolicy from '@/components/TablePrivacyPolicy.vue';
export default {
    name: 'PrivacyPolicyView',
    components: {
        DefaultLayout,
        ChartAILine,
        FormsPrivacy,
        TablePrivacyPolicy
    }

}
</script>

<style scoped></style>