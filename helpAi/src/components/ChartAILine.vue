<template>
    <div class="card">
        <Chart type="line" :data="chartData" :options="chartOptions" class="chart-line" />
    </div>
</template>

<script>
import Chart from 'primevue/chart';

export default {
    name: 'ChartAILine',
    data() {
        return {
            chartData: null,
            chartOptions: null
        };
    },
    components: {
        Chart
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
                        borderColor: '#5A6ACF',
                        tension: 0.4,
                        spanGaps: true
                    },
                    {
                        label: 'Previsão',
                        data: futureData,
                        fill: false,
                        borderColor: '#39BFA7',
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
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
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
</style>