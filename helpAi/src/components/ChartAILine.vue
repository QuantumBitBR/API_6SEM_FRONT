<template>

    <Card class="custom-card">
        <template #title>
            <div class="title-div">
                <span class="status_title">Análise de Tendência por Produto</span>
            </div>

        </template>
        <template #content>
            <div class="chart-container">

                <div class="card">
                    <Chart type="line" :data="chartData" :options="chartOptions" class="chart-line" />
                </div>
            </div>
        </template>
    </Card>
</template>

<script>
import Chart from 'primevue/chart';
import { Card } from 'primevue';

export default {
    name: 'ChartAILine',
    data() {
        return {
            chartData: null,
            chartOptions: null
        };
    },
    components: {
        Chart, Card
    },
    mounted() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    },
    props: {
        labels: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        isFuture: {
            type: Array,
            required: true
        }
    },
    watch: {
        labels: {
            handler() {
                this.chartData = this.setChartData();
            },
            deep: true
        },
        data: {
            handler() {
                this.chartData = this.setChartData();
            },
            deep: true
        },
        isFuture: {
            handler() {
                this.chartData = this.setChartData();
            },
            deep: true
        }
    },
    methods: {

        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);
            const futureData = this.data.map((value, i) => (this.isFuture[i] ? value : null));
            const pastData = this.data.map((value, i) => (!this.isFuture[i] ? value : null));


            return {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Histórico',
                        data: pastData,
                        fill: false,
                        borderColor: '#2c3e50',
                        tension: 0.4,
                        spanGaps: true
                    },
                    {
                        label: 'Previsão',
                        data: futureData,
                        fill: false,
                        borderColor: '#26A69A',
                        borderDash: [6, 6],
                        tension: 0.4,
                        spanGaps: true
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        },
                        title: {
                            display: true,
                            text: 'Período',
                            color: textColor,
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        },
                        title: {
                            display: true,
                            text: 'Quantidade de Tickets',
                            color: textColor,
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                    }
                }
            };
        }
    }
};
</script>

<style scoped>
.chart-line {
    height: 30rem;
}

.custom-card {
    margin-top: 2rem;
}
.p-card-content{
    display: flex;
    justify-content: center;
}
.chart-container{
    width: 98%;
}
</style>