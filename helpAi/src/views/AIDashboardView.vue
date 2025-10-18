<template>
    <DefaultLayout>
        <FilterAI />
        
    </DefaultLayout>

</template>

<script lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import FilterAI from '@/components/FilterAI.vue';
import ChartAILine from '@/components/ChartAILine.vue';
export default {
    name: 'AIDashboardView',
    components: {
        DefaultLayout,
        FilterAI,
        ChartAILine
    }

}
</script>

<style scoped></style>