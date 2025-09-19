<template>
  <div class="full-width-card">
    <div class="card">
      <div class="card-header">
        <h2>Percentual de Tickets por Status</h2>
      </div>
      <div class="card-body">
        <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
        <div v-else class="loading">Carregando dados...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { StatusDataService } from '@/services/StatusDataService';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusData {
  status_name: string;
  ticket_count: number;
}

export default {
  name: 'TicketsByStatus',
  components: {
    Doughnut,
  },
  data() {
    return {
      chartData: null as any,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: { size: 12 },
              color: '#333',
            },
          
          },
        },
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const statusService = new StatusDataService();
      const data: StatusData[] = await statusService.getStatusData();
      const totalTickets = data.reduce((sum, item) => sum + item.ticket_count, 0);

      this.chartData = {
        labels: data.map((s: StatusData) => {
          const percentage = totalTickets > 0 ? ((s.ticket_count / totalTickets) * 100).toFixed(2) : '0.00';
          return `${s.status_name}: ${percentage}%`;
        }),
        datasets: [
          {
            data: data.map((s: StatusData) => s.ticket_count),
            backgroundColor: ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'],
            borderWidth: 1,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.full-width-card {
  border-radius: 12px;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 100%;
  padding: 8px;
}

.card {
  width: 100%;
  height: 320px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-header {
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
}

.card-header h2 {
  margin: 0;
  font-family: 'SnowUI', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 13px;
  font-weight: 600;
}

.card-body {
  padding: 8px;
  flex: 1 1 auto;
  min-height: 0;
}

.chart-wrapper {
  width: 100%;
  height: 100%;
}

.loading {
  margin: auto;
  color: #666;
  text-align: center;
  padding: 16px 0;
}
</style>