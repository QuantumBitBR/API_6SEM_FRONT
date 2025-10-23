<template>
    <div class="card">
        <Accordion>
            <AccordionPanel>
                <AccordionHeader>
                    <div class="header-content">
                        <i class="pi pi-info-circle"></i>
                        <span>Guia de Uso do Gráfico</span>
                    </div>
                </AccordionHeader>

                <AccordionContent>

                    <ul class="list">
                        <li>Este gráfico apresenta a previsão da quantidade de tickets abertos e a projeção futura
                            baseada na <a href="https://www.kaggle.com/datasets/selener/consumer-complaint-database"
                                target="_blank">base de dados do Kaggle</a> de chamados.</li>
                        <li>Para visualizar um produto específico, selecione-o e clique em <strong>Filtrar</strong>.
                        </li>
                        <li>Para prever um período específico, defina a quantidade de predições que deseja visualizar.
                        </li>
                        <li>Clique e arraste para ampliar uma área específica do gráfico.</li>
                        <li>Passe o cursor sobre as linhas para ver os valores exatos.</li>
                        <li>
                            Use o botão
                            <span class="reset-zoom">
                                <ArrowPathIcon class="refresh" />
                            </span>
                            para retornar à visualização inicial.
                        </li>

                    </ul>


                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
</template>

<script>
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

export default {
    name: 'AccordionSimples',
    components: {
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        ArrowPathIcon
    },
    data() {
        return {}
    }
}
</script>

<style scoped>
.card {
    width: 100%;
    margin: 2rem 1rem;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 1.1rem;
    color: #0c1947;
}

.header-content i {
    color: #2c3e50;
    font-size: 1.2rem;
}

.content-text {
    margin: 0;
    line-height: 1.6;
    color: #333;
    font-size: 0.95rem;
    padding: 10px 0;
}

.p-accordion-header-link {
    background-color: #2c3e50 !important;
    border-radius: 10px;
    transition: background-color 0.2s ease;
}

.p-accordion-header-link:hover {
    background-color: #2c3e50 !important;
}

.p-accordion-header,
.p-accordion-content {
    border: none !important;
}

.p-accordion-content {
    padding: 1rem;
    background-color: #f8f8ff;
    border-radius: 0 0 12px 12px;
}

.list>li {
    font-size: 0.85em;
}

.refresh {
    width: 25px;
    height: 25px;
}

.reset-zoom {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #2c3e50;
    font-weight: 600;
    cursor: pointer;
}

.reset-zoom:hover {
    color: #0C1947;
}
</style>
