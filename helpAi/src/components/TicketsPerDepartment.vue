<template>
    <div v-if="loading" class="loading">
        <Skeleton width="100%" height="320px"></Skeleton>
    </div>
    <div v-else="" class="full-card">
        <div class="card">
            <div class="card-header">
                <h2>Tickets por Departamento</h2>
            </div>
            <div class="card-body">
                <div class="chart-wrapper">
                    <Chart type="bar" :data="chartData" :options="chartOptions" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DepartmentDataService } from '@/services/DepartmentDataService';
import { Skeleton } from 'primevue';
import Chart from 'primevue/chart';
export default {
    components: {
        Chart,
        Skeleton
    },
    data() {
        return {
            departmentData: null,
            chartData: null,
            chartOptions: null,
            loading: true,
        }
    },
    async mounted() {
        await this.getChartData();
        if(this.departmentData){
            this.chartData = this.setChartData();
            this.chartOptions = this.setChartOptions();
        }
        this.loading = false;
    },
    methods: {
        async getChartData() {
            try {
                const service = new DepartmentDataService();
                const data = await service.getDepartmentData();

                this.departmentData = data;
            } catch (err) {
                console.error("An error occurred to get data:", err);
            }
        },
        setChartData() {
            const departments = this.departmentData.map(item => item.department_name);
            console.log(departments);
            const tickets = this.departmentData.map(item => item.ticket_count);
            return {
                labels: departments,
                datasets: [
                    {
                        data: tickets,
                        backgroundColor: "#3498db",
                    }
                ]
            }
        },
        setChartOptions() {
            return {
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
            };
        },

    },
}
</script>

<style scoped>
.full-card {
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

.chart-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
}

.p-chart {
    flex: 1;
    width: 100% !important;
    height: 100% !important;
}

.card-header {
    padding: 10px 12px;
    border-bottom: 1px solid #eee;
}

.card-header h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
}

.card-body {
    padding: 8px;
    flex: 1 1 auto;
    min-height: 0;
}

.loading {
    margin: auto;
    color: #666;
    text-align: center;
    padding: 16px 0;
}
</style>