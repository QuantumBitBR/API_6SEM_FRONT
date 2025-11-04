<template>
  <div v-if="loading" class="loading">
    <Skeleton width="100%" height="320px" />
  </div>
  <div v-else class="full-card">
    <Card class="custom-card">
      <template #title>
        <span class="status_title">Percentual de Tickets por SLAPlan</span>
      </template>
      <template #content>
        <div class="chart-container">
          <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
          <div v-else class="no-data">
            Nenhum dado disponível para os filtros aplicados
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Skeleton } from 'primevue';
import Card from 'primevue/card';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, ChartData, ChartOptions } from 'chart.js';
import { SLAPlanDataService } from '@/services/SLAPlanDataService';
import type { SLAPlan } from '@/services/SLAPlanDataService';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default defineComponent({
  name: 'SLAPlanChart',
  components: { Skeleton, Card, Doughnut },
  props: {
    filter: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      chartData: null as ChartData<'doughnut'> | null,
      chartOptions: {} as ChartOptions<'doughnut'>,
      loading: true
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const slaplanService = new SLAPlanDataService();
      try {
        const data: SLAPlan[] = await slaplanService.getSLAPlanData(this.filter);

        if (!data.length) {
          this.chartData = null;
          return;
        }

        this.chartData = {
          labels: data.map(s => s.slaplan_name),
          datasets: [
            {
              data: data.map(s => s.percentage),
              backgroundColor: ['#3498db', '#2980b9', '#74b9ff', '#2c3e50', '#5dade2', '#aed6f1'],
              borderWidth: 0,
              hoverOffset: 12
            }
          ]
        };

        this.chartOptions = {
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
                generateLabels: (chart: any) => {
                  return chart.data.labels.map((label: string, i: number) => {
                    const value = chart.data.datasets[0].data[i] as number;
                    const formattedValue = value.toFixed(1);
                    return {
                      text: `${label} (${formattedValue}%)`,
                      fillStyle: chart.data.datasets[0].backgroundColor[i],
                      hidden: !chart.getDataVisibility(i),
                      index: i
                    };
                  });
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (context: any) => `${context.label}: ${context.raw.toFixed(1)}%`
              }
            }
          }
        };
      } catch (err) {
        console.error("Erro ao buscar dados de SLAPlan:", err);
        this.chartData = null;
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
        filter: {
            handler(newVal, oldVal) {
                if(newVal !== oldVal  )
                this.fetchData();
            },
            deep: true
        }
    }
}
);
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
</style>
