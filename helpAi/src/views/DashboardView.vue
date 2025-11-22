<template>
  <DefaultLayout>
    <Filter @filter="getFilter" />
    <div class="priority-cards-container">
      <PriorityCard title="Crítico" :filter="filtroAtual" :quantity="criticalTotal" :priority="'Critical'" />
      <PriorityCard title="Alta prioridade" :filter="filtroAtual" :quantity="highTotal" priority="High" />
      <PriorityCard title="Média prioridade" :filter="filtroAtual" :quantity="mediumTotal" priority="Moderate" />
      <PriorityCard title="Baixa prioridade" :filter="filtroAtual" :quantity="lowTotal" priority="Low" />
    </div>

    <div class="grid-container1">
      <TicketsByStatus :filter="filtroAtual" />
      <TicketsPerCompany :filter="filtroAtual" />
    </div>
    <div class="grid-container2">
      <TicketsPerProduct :filter="filtroAtual" />
      <TicketsPerCategory :filter="filtroAtual" />
    </div>
    <div class="grid-container3">
      <TicketsPerDepartment :filter="filtroAtual" />
      <TicketsBySLAPlan :filter="filtroAtual" />
    </div>
  </DefaultLayout>
  <PrivacyPolicy v-model:visible="showPolicy" @accept="hidePolicy()" />

</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Calendar from '@/components/Calendar.vue'
import TicketsByStatus from '@/components/TicketsByStatus.vue'
import TicketsPerProduct from '@/components/TicketsPerProduct.vue'
import TicketsPerCompany from '@/components/TicketsPerCompany.vue'
import TicketsPerCategory from '@/components/TicketsPerCategory.vue'
import PrivacyPolicy from '@/components/PrivacyPolicy.vue'
import TicketsPerDepartment from '@/components/TicketsPerDepartment.vue'
import Filter from '@/components/Filter.vue'
import PriorityCard from '@/components/PriorityCard.vue'
import { PriorityDataService } from '@/services/PriorityDataService'
import TicketsBySLAPlan from '@/components/TicketsBySLAPlan.vue'

export default {
  name: 'Dashboard',
  data() {
    return {
      criticalTotal: null,
      highTotal: null,
      mediumTotal: null,
      lowTotal: null,
      showPolicy: false,
      filtroAtual: null
    }
  },
  components: {
    DefaultLayout,
    Filter,
    Calendar,
    TicketsByStatus,
    TicketsPerProduct,
    TicketsPerCompany,
    TicketsPerCategory,
    PrivacyPolicy,
    TicketsPerDepartment,
    PriorityCard,
    TicketsBySLAPlan
  },
  async mounted() {
    if (localStorage.getItem('termoExpirado') == 'true') {
      this.showPolicy = true
    }
    await this.getTicketCount()
  },
  methods: {
    hidePolicy() {
      this.showPolicy = !this.showPolicy
    },
    async getFilter(filtro) {
      this.filtroAtual = filtro
      await this.getTicketCount()
    },
    async getTicketCount() {
      this.criticalTotal = null;
      this.highTotal = null;
      this.mediumTotal = null;
      this.lowTotal = null;
      const priorityService = new PriorityDataService()
      const data = await priorityService.getPriorityData(this.filtroAtual)
      this.criticalTotal = data?.[2]?.ticket_count ?? 0
      this.highTotal = data?.[0]?.ticket_count ?? 0
      this.mediumTotal = data?.[3]?.ticket_count ?? 0
      this.lowTotal = data?.[1]?.ticket_count ?? 0
    }
  },
  watch: {
    filtroAtual: {
      handler: 'getTicketCount',
      deep: true
    }
  }
}
</script>

<style lang="css">
.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 220px;
  height: 100vh;
  background-color: #34495e;
  color: white;
}

.main-area {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.navbar {
  height: 60px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #ecf0f1;
}

.calendar-container {
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 25%;
  min-width: 200px;
  max-width: 300px;
  margin-left: auto;
  margin-right: 0;
}

.grid-container1,
.grid-container3 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.grid-container2 {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 10px;
  margin-bottom: 20px;
}


@media (max-width: 768px) {
  .calendar-container {
    width: 100%;
    max-width: 100%;
  }
}

.priority-cards-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
