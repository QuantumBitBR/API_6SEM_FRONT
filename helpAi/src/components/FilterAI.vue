<template>
    <div class="full-card">
        <Card class="custom-card">
            <template #title>
                <div class="title-div">
                    <span class="status_title">Filtros</span>
                    <Button class="button-filter" @click="getPredicts()">
                        <template #icon>
                            <FunnelIcon class="w-4 h-4 filter" />
                            Filtrar
                        </template>
                    </Button>
                </div>

            </template>
            <template #content>
                <div class="chart-container">
                    <div>
                        <label for="">Quantidade de Previsões</label>
                        <InputNumber v-model="quantPrev" :min="1" :placeholder="'Digite a quantidade de previsões'" />

                    </div>
                    <div>
                        <label for="">Frequência</label>
                        <Select v-model="frequencia" :options="list_frequencia" optionLabel="value"
                            placeholder="Selecione a frequência" class="w-full md:w-56" option-value="name" />
                    </div>
                    <div>

                        <label for="">Produto</label>
                        <Select v-model="product_id" :options="products" optionLabel="ProductName"
                            placeholder="Selecione o produto" class="w-full md:w-56" option-value="ProductID" />
                    </div>
                </div>
            </template>
        </Card>
    </div>

    <ChartAILine :data="predict_data.map(item => item.yhat)" :labels="predict_data.map(item => item.ds)"
        :isFuture="predict_data.map(item => item.is_future)" :loading="isLoading" />

</template>

<script lang="ts">
import { Select, Skeleton } from 'primevue';
import Card from 'primevue/card';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import { ProductDataService } from '@/services/ProductDataService';
import AIService from '@/services/AIService';
import { FunnelIcon } from '@heroicons/vue/24/outline';
import Button from 'primevue/button';
import { showToast } from '@/eventBus';
import ChartAILine from './ChartAILine.vue';
interface ProductInfo {
    ProductID: number,
    ProductName: string,
}
interface DataPredict {
    ds: string,
    year: number,
    yhat: number,
    is_future: boolean
}

export default {
    name: 'ChartAITrend',
    components: {
        Card, Skeleton, InputNumber, Select, DatePicker, FunnelIcon, Button, ChartAILine
    },
    data() {
        return {
            quantPrev: null,
            frequencia: '',
            start_date: null,
            product_id: null,
            list_frequencia: [
                { "name": 'YE', "value": 'Ano' },
                { "name": 'ME', "value": 'Mês' },
                { "name": 'D', "value": 'Dia' },
            ],
            products: [] as ProductInfo[],
            predict_data: [] as DataPredict[],
            isLoading: true
        }
    },
    methods: {
        async getProducts() {
            try {
                const service = new ProductDataService();
                this.products = await service.getAllProductsAI()
            } catch (error: any) {
                showToast({
                    severity: 'error',
                    summary: 'Atenção',
                    detail: 'Erro ao buscar os dados. Entre em contato com seu administrador.',
                    life: 3000
                });
            }
        },
        async getPredicts() {
            this.isLoading = true;
            try {
                const service = new AIService();
                let date = null
                if (this.start_date != null) {
                    date = this.formatData(String(this.start_date));
                }
                this.predict_data = await service.getPredict(this.quantPrev, this.frequencia, date, this.product_id);
                console.log(this.predict_data)
            } catch (error: any) {
                showToast({
                    severity: 'error',
                    summary: 'Atenção',
                    detail: 'Erro ao buscar os dados. Entre em contato com seu administrador.',
                    life: 3000
                });
            }
            this.isLoading = false;
        },
        formatData(dateStr: string) {
            const d = new Date(dateStr)
            const ano = d.getFullYear()
            const mes = String(d.getMonth() + 1).padStart(2, '0')
            const dia = String(d.getDate()).padStart(2, '0')
            return `${ano}-${mes}-${dia}`
        }
    },
    async mounted() {
        await this.getProducts()
        await this.getPredicts()
        this.isLoading = false;
    }

}
</script>

<style scoped>
.chart-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    width: 100%;
    padding: 1.5rem 2rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 1rem;
}

.chart-container>div {
    display: flex;
    flex-direction: column;
}

.chart-container label {
    font-weight: 600;
    color: #222;
    margin-bottom: 0.4rem;
    font-size: 0.95rem;
}

.chart-container .p-inputtext,
.chart-container .p-inputnumber-input,
.chart-container .p-dropdown,
.chart-container .p-calendar {
    width: 100%;
    border-radius: 8px !important;
}

@media (max-width: 800px) {
    .chart-container {
        grid-template-columns: 1fr;
    }
}

.button-filter {
    width: 120px;
    height: 40px;
    background-color: #34495e;
    border: none
}

.filter {
    width: 30px;
    height: 30px;
    margin-right: 8px;
}

.status_title {
    margin-right: 20px
}

.title-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.button-filter:hover {
    background-color: #0c0079;
    border: none
}
</style>