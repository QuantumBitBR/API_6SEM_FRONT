<template>
  <div v-if="loading" class="loading">
    <Skeleton width="100%" height="320px" />
  </div>
  <div v-else class="full-card">
    <Card class="custom-card">
      <template #title>
        <div class="flex align-items-center">
          <span class="text-xl font-semibold">Percentual de Tickets por Status</span>
        </div>
      </template>
      <template #content>
        <div class="chart-container">
          <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import { Skeleton } from 'primevue';
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
import { StatusDataService } from '@/services/StatusDataService';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData: Ref<ChartData<'doughnut'> | null> = ref(null);
const loading = ref(true);

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
        label: function (context) {
          const label = context.label || '';
          const value = context.raw as number || 0;
          const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
          const percentage = total === 0 ? 0 : Math.round((value / total) * 100);
          return `${label}: ${value} (${percentage}%)`;
        }
      }
    }
  },
  cutout: '60%'
};

const statusService = new StatusDataService();

const fetchData = async () => {
  loading.value = true;

  try {
    const data = await statusService.getStatusData();

    if (data.length === 0) {
      chartData.value = null;
      return;
    }

    chartData.value = {
      labels: data.map(s => `${s.status_name} ${s.ticket_count}%`),

      datasets: [
        {
          data: data.map(s => s.ticket_count),
          backgroundColor: [
            '#3498db',
            '#2980b9',
            '#74b9ff',
            '#2c3e50',
            '#5dade2'
          ],
          borderWidth: 0,
          hoverOffset: 12
        }
      ]
    };
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
    chartData.value = null;
  } finally {
    loading.value = false;
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
  font-family: 'SnowUI, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
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

.loading {
  margin: auto;
  color: #666;
  text-align: center;
  padding: 16px 0;
}

.full-card{
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}
</style>