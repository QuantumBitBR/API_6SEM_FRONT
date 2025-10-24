<template>
    <div class="full-card">
        <Card class="custom-card">
            <template #title>
                <div class="title-div">
                    <span class="status_title">Filtros</span>
                    <Button class="button-filter" @click="modelFilters()">
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
                        <Select v-model="company" :options="company_list" optionLabel="CompanyName"
                            placeholder="Selecione a empresa" class="w-full md:w-56" option-value="CompanyID" />
                    </div>
                    <div>
                        <label for="">Categoria</label>
                        <Select v-model="category" :options="category_list" optionLabel="category_name"
                            placeholder="Selecione a categoria" class="w-full md:w-56" option-value="category_id" />
                    </div>
                    <div>
                        <label for="">Produto</label>
                        <Select v-model="product" :options="product_list" optionLabel="ProductName"
                            placeholder="Selecione o produto" class="w-full md:w-56" option-value="ProductID" />
                    </div>
                    <div>
                        <label for="">Período</label>
                        <DatePicker v-model="dateRange" selectionMode="range" showIcon fluid :showOnFocus="false"
                            dateFormat="dd/mm/yy" placeholder="Selecione o período" />
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import { Select } from 'primevue';
import Card from 'primevue/card';
import DatePicker from 'primevue/datepicker';
import { ProductDataService } from '@/services/ProductDataService';
import { FunnelIcon } from '@heroicons/vue/24/outline';
import Button from 'primevue/button';
import { showToast } from '@/eventBus';
import { CategoryDataService } from '@/services/CategoryDataService';
import { CompanyDataService } from '@/services/CompanyDataService';

export default {
    name: 'Filter',
    components: {
        Card, Select, DatePicker, FunnelIcon, Button
    },
    data() {
        return {
            dateRange: null,
            company_list: null,
            company: null,
            category_list: null,
            category: null,
            product_list: null,
            product: null
        }
    },
    methods: {
        async getAllCompanies() {
            try {
                const service = new CompanyDataService();
                const data = await service.getAllCompanies();
                this.company_list = data;
            } catch (error) {
                console.error("Erro ao buscar empresas:", error);
                showToast({
                    severity: 'error',
                    summary: 'Erro ao buscar empresas',
                    detail: error.message,
                    life: 3000
                });
            }
        },
        async getAllCategories() {
            try {
                const service = new CategoryDataService();
                const data = await service.getAllCategories();
                this.category_list = data;
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
                showToast({
                    severity: 'error',
                    summary: 'Erro ao buscar categorias',
                    detail: error.message,
                    life: 3000
                });
            }
        },
        async getAllProducts() {
            try {
                const service = new ProductDataService();
                const data = await service.getAllProducts();
                this.product_list = data;
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                showToast({
                    severity: 'error',
                    summary: 'Erro ao buscar produtos',
                    detail: error.message,
                    life: 3000
                });
            }
        },
        modelFilters() {
            const formatDate = (date) => {
                if (!date) return null;
                const d = new Date(date);
                return d.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            };

            const filters = {};

            // Formatar para o que o backend espera
            if (this.company) {
                filters.company_id = [this.company];
            }
            if (this.category) {
                filters.category_id = [this.category];
            }
            if (this.product) {
                filters.product_id = [this.product];
            }
            if (this.dateRange && this.dateRange.length === 2) {
                filters.createdat = formatDate(this.dateRange[0]);
                filters.end_date = formatDate(this.dateRange[1]);
            }

            console.log('🎯 [Filter] Emitindo filtros:', filters);
            this.$emit('filter', filters);
        }
    },
    async mounted() {
        await this.getAllCompanies();
        await this.getAllCategories();
        await this.getAllProducts();
    }
}
</script>

<style scoped>
.full-card {
    margin-bottom: 20px;
}

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
