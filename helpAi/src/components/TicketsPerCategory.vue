<template>
    <div v-if="loading" class="loading">
        <Skeleton width="100%" height="320px"></Skeleton>
    </div>
    <div v-else class="full-card">
        <div class="card">
            <div class="card-header">
                <h2>Tickets por Categoria</h2>
            </div>
            <div class="chart-body">
                <div class="chart-container">
                    <Chart
                        v-if="chartData"
                        type="bar"
                        :data="chartData"
                        :options="chartOptions"
                        :key="componentKey"
                        :style="{ width: '100%', height: '100%' }"
                    />
                    <div v-else class="no-data">
                        Nenhum dado disponível para os filtros aplicados
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { CategoryDataService } from '@/services/CategoryDataService';
import Skeleton from 'primevue/skeleton';
import Chart from 'primevue/chart';

export default {
    name: 'TicketsPerCategory',
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
            categoryData: [],
            chartData: null,
            chartOptions: this.getDefaultOptions(),
            loading: true,
            componentKey: 0
        }
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            this.loading = true;
            try {
                const service = new CategoryDataService();
                const data = await service.getCategoryData(this.filter);

                if(data && data.length > 0) {
                    this.updateChartData(data);
                } else {
                    this.chartData = null
                }
            } catch (err) {
                this.chartData = null;
            } finally {
                this.loading = false;
            }
        },

        updateChartData(data) {
            const categories = data.map(item => String(item.category_name));
            const tickets = data.map(item => Number(item.ticket_count));

            this.chartData = {
                labels: [...categories],
                datasets: [
                    {
                        label: 'Quantidade de Tickets',
                        data: [...tickets],
                        backgroundColor: [
                            "#3498db", "#2980b9", "#74b9ff",
                            "#2c3e50", "#5dade2", "#1abc9c"
                        ],
                        borderColor: "#2980b9",
                        borderWidth: 1,
                        borderRadius: 6,
                        barPercentage: 0.7,
                        categoryPercentage: 0.8
                    }
                ]
            };

            this.componentKey += 1;
        },

        getDefaultOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 500,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
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
                            drawBorder: false
                        },
                        ticks: {
                            color: "#444",
                            font: {
                                family: 'SnowUI, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                size: 12,
                                weight: "600",
                            },
                            maxRotation: 45,
                            minRotation: 0
                        },
                    },
                    y: {
                        type: "linear",
                        beginAtZero: true,
                        grid: {
                            color: "rgba(0,0,0,0.06)",
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 8,
                            color: "#444",
                            font: {
                                family: 'SnowUI, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                size: 11,
                            },
                            callback: function(value) {
                                return value.toLocaleString('pt-BR');
                            }
                        },
                    },
                },
            };
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

.chart-body {
    flex: 1;
    padding: 0;
    position: relative;
}

.chart-container {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 8px;
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
    color: #666;
    font-style: italic;
    text-align: center;
    width: 100%;
    padding: 20px;
}
</style>
