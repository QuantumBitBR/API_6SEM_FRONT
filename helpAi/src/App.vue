<template>
  <Toast />
  <RouterView />
</template>

<script setup lang="ts">
import { Toast } from 'primevue';
import { useToast } from 'primevue/usetoast';
import { onBeforeUnmount, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { offToast, onToast } from './eventBus';

const toast = useToast();

function handleToast(payload: any) {
  toast.add(payload);
}

onMounted(() => {
  onToast(handleToast);
});

onBeforeUnmount(() => {
  offToast(handleToast);
});
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}
</style>
