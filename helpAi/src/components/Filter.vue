<template>
    <div class="full-card">
        <Card class="custom-card">
            <template #title>
                <div class="title-div">
                    <span class="status_title">Filtros</span>
                    <Button class="button-filter" @click="console.log('a')">
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
                        <label for="">Empresa</label>
                        <Select v-model="frequencia" :options="list_frequencia" optionLabel="value"
                            placeholder="Selecione a empresa" class="w-full md:w-56" option-value="name" />
                    </div>
                    <div>
                        <label for="">Categoria</label>
                        <Select v-model="frequencia" :options="list_frequencia" optionLabel="value"
                            placeholder="Selecione a categoria" class="w-full md:w-56" option-value="name" />
                    </div>
                    <div>
                        <label for="">Produto</label>
                        <Select v-model="product_id" :options="products" optionLabel="ProductName"
                            placeholder="Selecione o produto" class="w-full md:w-56" option-value="ProductID" />
                    </div>
                    <div>
                        <label for="">Período</label>
                        <DatePicker v-model="start_date" showIcon fluid :showOnFocus="false" />
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
import { FunnelIcon } from '@heroicons/vue/24/outline';
import Button from 'primevue/button';
import { showToast } from '@/eventBus';
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
    name: 'Filter',
    components: {
        Card, Skeleton, InputNumber, Select, DatePicker, FunnelIcon, Button
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
            isLoading: false
        }
    },
    methods: {
        formatData(dateStr: string) {
            const d = new Date(dateStr)
            const ano = d.getFullYear()
            const mes = String(d.getMonth() + 1).padStart(2, '0')
            const dia = String(d.getDate()).padStart(2, '0')
            return `${ano}-${mes}-${dia}`
        }
    },
    async mounted() {
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