<template>
    <DefaultLayout>
        <ChartAITrend />
        
    </DefaultLayout>

</template>

<script lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ChartAITrend from '@/components/ChartAITrend.vue';

export default {
    name: 'AIDashboardView',
    components: {
        DefaultLayout,
        ChartAITrend
    }

}
</script>

<style scoped></style>