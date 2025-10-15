<template>
    <!-- <div class="loading">
        <Skeleton width="100%" height="320px" />
    </div> -->

    <div class="full-card">
        <Card class="custom-card">
            <template #title>
                <span class="status_title">Filtros</span>
                <button @click="">filtrar</button>
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
                            placeholder="Selecione a frequência" class="w-full md:w-56" />
                    </div>
                    <div>


                        <label for="">Ver dados a partir de</label>
                        <DatePicker v-model="start_date" showIcon fluid :showOnFocus="false" />
                    </div>
                    <div>

                        <label for="">Produto</label>
                        <Select v-model="product_id" :options="products" optionLabel="ProductName"
                            placeholder="Selecione o produto" class="w-full md:w-56" />
                    </div>
                </div>
            </template>
        </Card>

    </div>
</template>

<script lang="ts">
import { Select, Skeleton } from 'primevue';
import Card from 'primevue/card';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import { ProductDataService } from '@/services/ProductDataService';

interface ProductInfo {
    ProductID: number,
    ProductName: string,
}

export default {
    name: 'ChartAITrend',
    components: {
        Card, Skeleton, InputNumber, Select, DatePicker
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
            products: [] as ProductInfo[]
        }
    },
    methods: {
        async getProducts() {
            try {
                const service = new ProductDataService();
                this.products = await service.getAllProductsAI()
            } catch (error) {
                console.log("ERROR")
            }
        }
    },
    mounted() {
        this.getProducts()
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
</style>