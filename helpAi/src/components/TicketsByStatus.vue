<template>
  <div class="container">
    <Card class="custom-card">
      <template #title>
        <div class="flex align-items-center">
          <i class="pi pi-chart-pie mr-2" style="font-size: 1.25rem"></i>
          <span class="text-xl font-semibold">Percentual de Tickets por Status</span>
        </div>
      </template>
      <template #content>
        <div v-if="!isLoading && chartData" class="chart-container">
          <Doughnut :data="chartData" :options="chartOptions" />
        </div>
        <div v-else-if="isLoading" class="loading-container">
          <ProgressSpinner
            style="width: 40px; height: 40px"
            strokeWidth="4"
            animationDuration=".5s" />
          <div class="loading-text">Carregando dados...</div>
        </div>
        <div v-else class="error-container">
          <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: #ef4444"></i>
          <div class="error-text">Erro ao carregar dados</div>
          <Button
            label="Tentar novamente"
            icon="pi pi-refresh"
            @click="fetchData"
            class="mt-3"
            outlined />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions
} from 'chart.js';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';


// Importando o service real
import { StatusDataService } from '@/services/StatusDataService';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData: Ref<ChartData<'doughnut'> | null> = ref(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: { size: 12 },
        color: '#495057',
        usePointStyle: true,
        padding: 20
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw as number || 0;
          const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
          if (total === 0) {
            return `${label}: ${value} (0%)`;
          }
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${value} (${percentage}%)`;
        }
      }
    }
  },
  cutout: '60%'
};

// Instância do service
const statusService = new StatusDataService();

const fetchData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const data = await statusService.getStatusData();

    if (data.length === 0) {
      error.value = 'Nenhum dado disponível';
      return;
    }

    chartData.value = {
      labels: data.map(s => s.status_name + ` ${s.ticket_count}%`),
      datasets: [
        {
          data: data.map(s => s.ticket_count),
          backgroundColor: [
            '#3498db', // Azul
            '#2980b9', // Azul escuro
            '#74b9ff', // Azul claro
            '#2c3e50', // Azul ardósia
            '#5dade2'  // Azul médio
          ],
          borderWidth: 0,
          hoverOffset: 12
        }
      ]
    };
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
    error.value = 'Falha ao buscar dados do servidor.';
    chartData.value = null;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.custom-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

:deep(.p-card-body) {
  padding: 0;
}

:deep(.p-card-title) {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 0;
  font-size: 1.15rem;
}

:deep(.p-card-content) {
  padding: 0;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-container {
  position: relative;
  height: 280px;
  width: 100%;
  padding: 1rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.loading-text {
  margin-top: 12px;
  color: #6c757d;
  font-size: 14px;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
}

.error-text {
  margin-top: 12px;
  color: #ef4444;
  font-size: 14px;
  text-align: center;
}
</style>
