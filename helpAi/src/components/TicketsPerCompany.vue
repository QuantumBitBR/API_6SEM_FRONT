<template>
    <div v-if="loading" class="loading">
        <Skeleton width="100%" height="320px"></Skeleton>
    </div>
    <div v-else class="full-card">
        <div class="card">
            <div class="card-header">
                <h2>Tickets por Companhia</h2>
                <!-- <div v-if="companyData" class="debug-info">
                    Total de empresas: {{ companyData.length }}
                </div> -->
            </div>
            <div class="card-body">
                <div class="chart-wrapper">
                    <Chart
                        v-if="chartData"
                        type="bar"
                        :data="chartData"
                        :options="chartOptions"
                        :key="chartKey"
                    />
                    <div v-else class="no-data">
                        Nenhum dado disponível para os filtros aplicados
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import { CompanyDataService } from '@/services/CompanyDataService';
import { Skeleton } from 'primevue';
import Chart from 'primevue/chart';

export default {
    name: 'CompanyChart',
    components: {
        Chart,
        Skeleton
    },
    props: {
        filter: {
            type: Object,
            required: false,
            default: null
        }
    },
    data() {
        return {
            companyData: null,
            chartData: null,
            chartOptions: null,
            loading: true,
            chartKey: 0
        }
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            this.loading = true;
            try {
                const service = new CompanyDataService();
                const data = await service.getCompanyData(this.filter);

                this.companyData = data;

                if(this.companyData && this.companyData.length) {
                    this.chartData = this.setChartData();
                    this.chartOptions = this.setChartOptions();
                    this.chartKey += 1;
                } else {
                    this.chartData = null;
                }
            } catch (err) {
                console.error("❌ Erro ao buscar dados:", err);
                this.chartData = null;
            } finally {
                this.loading = false;
            }
        },
        setChartData() {
            const companies = this.companyData.map(item => item.company_name);
            const tickets = this.companyData.map(item => item.ticket_count);
            return {
                labels: companies,
                datasets: [
                    {
                        label: 'Tickets',
                        data: tickets,
                        backgroundColor: "#3498db",
                        borderColor: "#2980b9",
                        borderWidth: 1,
                        borderRadius: 4,
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
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `Tickets: ${context.parsed.y}`;
                            }
                        }
                    }
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
    watch: {
        filter: {
            handler(newVal, oldVal) {
                if(newVal !== oldVal){
                    this.fetchData();
                }
            },
            deep: true
        }
    }
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
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 280px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-chart {
    flex: 1;
    width: 100% !important;
    height: 100% !important;
}

.card-header {
    padding: 10px 12px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
}

.debug-info {
    font-size: 11px;
    color: #666;
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
}

.card-body {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 280px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading {
    margin: auto;
    color: #666;
    text-align: center;
    padding: 16px;
}

.no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #666;
    font-style: italic;
}
</style>
