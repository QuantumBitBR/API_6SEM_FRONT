<template>
    <DefaultLayout>
        <FormsPrivacy />
        
    </DefaultLayout>

</template>

<script lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ChartAILine from '@/components/ChartAILine.vue';
import FormsPrivacy from '@/components/FormsPrivacy.vue';
export default {
    name: 'PrivacyPolicyView',
    components: {
        DefaultLayout,
        ChartAILine,
        FormsPrivacy
    }

}
</script>

<style scoped></style>