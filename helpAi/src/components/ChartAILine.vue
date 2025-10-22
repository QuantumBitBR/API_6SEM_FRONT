<template>

    <Card class="custom-card">
        <template #title>
            <div class="title-div">
                <span class="status_title">Análise de Tendência por Produto</span>
                <Button class="button-info" @click="resetZoom()"
                    v-tooltip="'Para visualizar os dados mais de perto, basta selecionar a área do gráfico.'">
                    <template #icon>
                        <InformationCircleIcon class="w-4 h-4 info" id="icon" />

                    </template>
                </Button>
                
                <Button class="button-reset" @click="resetZoom()" v-tooltip="'Resetar Zoom'">
                    <template #icon>
                        <ArrowPathIcon class="w-4 h-4 refresh" id="icon" />
                    </template>
                </Button>
            </div>

        </template>
        <template #content>
            <div class="chart-container">

                <div class="card">
                    <Chart ref="chartRef" type="line" :data="chartData" :options="chartOptions" class="chart-line" />
                </div>
            </div>
        </template>
    </Card>
</template>

<script>
import Chart from 'primevue/chart';
import { Card } from 'primevue';
import zoomPlugin from 'chartjs-plugin-zoom'
import { Chart as ChartJS } from 'chart.js'
import Button from 'primevue/button';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';
import Tooltip from 'primevue/tooltip';

if (!ChartJS.registry.plugins.get('zoom')) {
    ChartJS.register(zoomPlugin)
}

export default {
    name: 'ChartAILine',
    data() {
        return {
            chartData: null,
            chartOptions: null
        };
    },
    directives: {
        tooltip: Tooltip
    },
    components: {
        Chart, Card, Button, ArrowPathIcon, InformationCircleIcon
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
        resetZoom() {
            const chart = this.$refs.chartRef?.chart;
            if (chart) chart.resetZoom();
        },

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
                    },
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'xy',
                            onPan: ({ chart, deltaX, deltaY }) => {
                                const xScale = chart.scales.x;
                                const yScale = chart.scales.y;

                                const xRange = xScale.max - xScale.min;
                                const yRange = yScale.max - yScale.min;

                                const xDelta = (deltaX / chart.width) * xRange;
                                const yDelta = (deltaY / chart.height) * yRange;

                                xScale.options.min = xScale.min + xDelta;
                                xScale.options.max = xScale.max + xDelta;

                                yScale.options.min = yScale.min - yDelta;
                                yScale.options.max = yScale.max - yDelta;

                                chart.update('none');
                            },
                        },
                        zoom: {
                            drag: {
                                enabled: true,
                                backgroundColor: 'rgba(54,162,235,0.3)',
                                borderColor: 'rgba(54,162,235,0.8)',
                                borderWidth: 1,
                            },
                            mode: 'xy',
                            wheel: {
                                enabled: true,
                                speed: 0.05
                            },
                            pinch: {
                                enabled: false
                            },
                            limits: {
                                x: { minRange: 1 },
                                y: { minRange: 1 }
                            }
                        }
                    },
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

.p-card-content {
    display: flex;
    justify-content: center;
}

.chart-container {
    width: 98%;
}

.button-reset {
    width: 35px;
    height: 35px;
    background-color: #34495e;
    border: none;
    margin-left: 10px;
}

.refresh {
    width: 25px;
    height: 25px;
}

.info {
    width: 25px;
    height: 25px;
}

.button-info {
    width: 35px;
    height: 35px;
    background-color: #34495e;
    border: none;
    margin-left: 10px;
}

.title-div {
    display: flex;
    align-items: center;
}
</style>