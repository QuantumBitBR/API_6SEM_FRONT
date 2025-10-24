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
            v-if="chartData && chartData.labels && chartData.labels.length > 0"
            :data="chartData"
            :options="chartOptions"
            :key="chartKey"
            class="chart-canvas"
          />
          <div v-else class="no-data">
            Nenhum dado disponível
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import Skeleton from 'primevue/skeleton';
import Card from 'primevue/card';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { StatusDataService } from '@/services/StatusDataService';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default defineComponent({
  name: 'TicketsByStatus',
  components: { Skeleton, Card, Doughnut },
  props: {
    filter: {
      type: Object,
      required: false,
      default: null
    }
  },
  setup(props) {
    const chartData = ref(null);
    const chartOptions = ref({});
    const loading = ref(true);
    const chartKey = ref(0);

    const fetchData = async () => {
      loading.value = true;
      const statusService = new StatusDataService();

      try {
        const data = await statusService.getStatusData(props.filter);

        if (!data || !data.length) {
          chartData.value = null;
          return;
        }

        // Garantir que os valores são números
        const percentages = data.map(s => Number(s.percentage) || 0);

        chartData.value = {
          labels: data.map(s => s.status_name),
          datasets: [
            {
              data: percentages,
              backgroundColor: [
                '#3498db', '#2980b9', '#74b9ff',
                '#2c3e50', '#5dade2', '#1abc9c',
                '#16a085', '#27ae60', '#e74c3c'
              ],
              borderColor: '#ffffff',
              borderWidth: 2,
              hoverOffset: 15
            }
          ]
        };

        chartOptions.value = {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: {
                  size: 12,
                  family: 'SnowUI, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                },
                color: '#495057',
                usePointStyle: true,
                padding: 15,
                generateLabels: function(chart) {
                  const data = chart.data;
                  if (data.labels && data.datasets && data.datasets[0]) {
                    return data.labels.map((label, i) => {
                      const value = data.datasets[0].data[i];
                      return {
                        text: `${label} (${value.toFixed(1)}%)`,
                        fillStyle: data.datasets[0].backgroundColor[i],
                        strokeStyle: data.datasets[0].borderColor[i],
                        lineWidth: data.datasets[0].borderWidth,
                        hidden: !chart.getDataVisibility(i),
                        index: i
                      };
                    });
                  }
                  return [];
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed;
                  return `${label}: ${value.toFixed(1)}%`;
                }
              }
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        };

        chartKey.value += 1;
      } catch (err) {
        console.error('Erro no gráfico de status:', err);
        chartData.value = null;
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchData();
    });

    watch(
      () => props.filter,
      () => {
        fetchData();
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
.full-card {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
}

.custom-card {
  border-radius: 12px;
  background: #ffffff;
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.p-card-body) {
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.p-card-title) {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0;
  font-size: 1.15rem;
  background: #f8f9fa;
  border-radius: 12px 12px 0 0;
}

:deep(.p-card-content) {
  padding: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.status_title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 280px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-canvas {
  width: 100% !important;
  height: 100% !important;
  max-height: 250px;
}

.loading {
  margin: auto;
  color: #666;
  text-align: center;
  padding: 16px 0;
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6b7280;
  font-style: italic;
  text-align: center;
  width: 100%;
}
</style>
