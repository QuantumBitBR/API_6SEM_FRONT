<template>
    <DefaultLayout>
        <FilterAI />
        
    </DefaultLayout>

</template>

<script lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import FilterAI from '@/components/FilterAI.vue';

export default {
    name: 'AIDashboardView',
    components: {
        DefaultLayout,
        FilterAI
    }

}
</script>

<style scoped></style>