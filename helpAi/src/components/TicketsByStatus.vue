<template>
  <div v-if="loading" class="loading">
    <Skeleton width="100%" height="320px" />
  </div>
  <div v-else class="full-card">
    <Card class="custom-card">
      <template #title>
        <span class="status_title">Percentual de Tickets por Status</span>
      </template>
      <template #content>
        <div class="chart-container">
          <Doughnut
            v-if="chartData"
            :data="chartData"
            :options="chartOptions"
            :key="chartKey"
          />
          <div v-else class="no-data">Nenhum dado disponível</div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch } from 'vue';
import { Skeleton } from 'primevue';
import Card from 'primevue/card';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { StatusDataService } from '@/services/StatusDataService';
import type { TicketFilters } from '@/services/FiltersDataService';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default defineComponent({
  name: 'StatusChart',
  components: { Skeleton, Card, Doughnut },
  props: {
    filter: {
      type: Object as PropType<TicketFilters>,
      required: false,
      default: null
    }
  },
  setup(props) {
    const chartData = ref<ChartData<'doughnut'> | null>(null);
    const chartOptions = ref<ChartOptions<'doughnut'>>({});
    const loading = ref(true);
    const chartKey = ref(0);

    const fetchData = async () => {
      loading.value = true;
      const statusService = new StatusDataService();

      try {
        console.log('🔍 [StatusChart] Buscando dados com filtro:', props.filter);
        const data = await statusService.getStatusData(props.filter);
        console.log('📊 [StatusChart] Dados recebidos:', data);

        if (!data.length) {
          chartData.value = null;
          return;
        }

        chartData.value = {
          labels: data.map(s => s.status_name),
          datasets: [
            {
              data: data.map(s => s.ticket_count),
              backgroundColor: ['#3498db', '#2980b9', '#74b9ff', '#2c3e50', '#5dade2'],
              borderWidth: 0,
              hoverOffset: 12
            }
          ]
        };

        chartOptions.value = {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: { size: 12 },
                color: '#495057',
                usePointStyle: true,
                padding: 20,
                generateLabels: (chart) => {
                  const data = chart.data;
                  return data.labels?.map((label, i) => {
                    const value = data.datasets[0].data[i] as number;
                    return {
                      text: `${label} (${value}%)`,
                      fillStyle: data.datasets[0].backgroundColor[i],
                      hidden: !chart.getDataVisibility(i),
                      index: i
                    };
                  }) || [];
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${value}%`;
                }
              }
            }
          }
        };

        chartKey.value += 1;
      } catch (err) {
        console.error('❌ [StatusChart] Erro:', err);
        chartData.value = null;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchData);

    watch(
      () => props.filter,
      (newVal, oldVal) => {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          console.log('🔄 [StatusChart] Filtro mudou, atualizando...');
          fetchData();
        }
      },
      { deep: true }
    );

    return {
      chartData,
      chartOptions,
      loading,
      chartKey
    };
  }
});
</script>

<style scoped>
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
.status_title {
  font-size: 14px;
  font-weight: 600;
  color: black;
}
.chart-container {
  position: relative;
  height: 280px;
  width: 80%;
  padding: 1rem;
}
.loading {
  margin: auto;
  color: #666;
  text-align: center;
  padding: 16px 0;
}
.full-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}
.no-data {
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>
