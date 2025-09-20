<template>
  <div v-if="loading" class="loading">
    <Skeleton width="100%" height="320px"></Skeleton>
  </div>
  <div v-else="" class="full-width-card">
    <div class="card">
      <div class="card-header">
        <h2>Tickets por Empresa</h2>
      </div>
      <div class="card-body">
        <div v-if="chartData" class="chart-wrapper">
          <BarChart :data="chartData" :options="chartOptions" />
        </div>
        <div v-else class="loading">Carregando dados...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "vue-chartjs";
import { CompanyDataService } from "@/services/CompanyDataService";
import { Skeleton } from "primevue";


function getTankWidth(
  barElem: BarElement | undefined,
  chart: ChartJS,
  chartArea: { left: number; right: number },
  xScale: CategoryScale,
  i: number,
  data: number[]
) {
  let tankWidth = 0;
  if (barElem) {

    const ds = chart.data.datasets[0];
    type BarDataset = { barThickness?: number };
    tankWidth = (ds && (ds as BarDataset).barThickness) ? (ds as BarDataset).barThickness! : 0;
  }
  if (!tankWidth) {
    let space = (chartArea.right - chartArea.left) / Math.max(5, data.length);
    if (xScale.getPixelForTick && data.length > 1) {
      const p0 = xScale.getPixelForTick(0);
      const p1 = xScale.getPixelForTick(1);
      space = Math.abs(p1 - p0);
    }
    tankWidth = space * (chart.options?.datasets?.bar?.categoryPercentage ?? 0.9) * (chart.options?.datasets?.bar?.barPercentage ?? 0.9);
  }
  return tankWidth;
}

function getCenterX(barElem: BarElement | undefined, xScale: CategoryScale, i: number) {
  let centerX = xScale.getPixelForTick(i);
  if (barElem && typeof barElem.x === "number") centerX = barElem.x;
  return centerX;
}

function drawTankRect(ctx: CanvasRenderingContext2D, x: number, topY: number, bottomY: number, tankWidth: number) {
  const rectX = x - tankWidth / 2;
  const rectY = topY;
  const rectH = bottomY - topY;
  ctx.fillRect(rectX, rectY, tankWidth, rectH);
}

const bgTankPlugin = {
  id: "bgTankPlugin",
  beforeDatasetsDraw(chart: ChartJS) {
    const ctx: CanvasRenderingContext2D = chart.ctx;
    const chartArea = chart.chartArea;
    const xScale = chart.scales.x;
    const yScale = chart.scales.y;
    if (!chart.data || !chart.data.datasets || !chart.data.datasets[0]) return;
    const data = chart.data.datasets[0].data || [];
    if (!data.length) return;

    const numericData = (data as (number | string)[]).filter((v) => typeof v === "number") as number[];
    if (!numericData.length) return;
    const max = Math.max(...numericData);

    ctx.save();
    ctx.fillStyle = "#f0f2f7";

    const meta = chart.getDatasetMeta(0);

    for (let i = 0; i < data.length; i++) {
      const barElem = meta.data[i];
      const tankWidth = getTankWidth(barElem, chart, chartArea, xScale, i, data);
      const centerX = getCenterX(barElem, xScale, i);
      const topY = yScale.getPixelForValue(max);
      const bottomY = chartArea.bottom;
      drawTankRect(ctx, centerX, topY, bottomY, tankWidth);
    }

    ctx.restore();
  },
};


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, bgTankPlugin);

export default defineComponent({
  name: "TicketsPerCompany",
  components: {
    BarChart: Bar,
    Skeleton,
  },
  data() {
    return {
      loading: true,
      chartData: null as ChartData<"bar"> | null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: "category",
            grid: {
              display: false,
            },
            ticks: {
              color: "#444",
              font: {
                family: 'SnowUI, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                size: 13,
                weight: "600",
              },
            },
          },
          y: {
            type: "linear",
            beginAtZero: true,
            grid: {
              color: "rgba(0,0,0,0.06)",
            },
            ticks: {
              maxTicksLimit: 10,
              color: "#444",
              font: {
                family: 'SnowUI, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                size: 13,
              },
            },
          },
        },
      } as unknown as ChartOptions<"bar">,
    };
  },
  methods: {
    async loadData(){
      try{
        const service = new CompanyDataService();
        const companies = await service.getCompanyData();

        this.chartData = {
          labels: companies.map((c) => c.company_name),
          datasets: [
            {
              data: companies.map((c) => c.ticket_count),
              backgroundColor: "#3498db",
            },
          ],
        };
        this.loading = false;
      } catch (error) {
        console.error("Error loading company data:", error);
      }
    }
  },
  mounted() {
    this.loadData();
  },
});
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
