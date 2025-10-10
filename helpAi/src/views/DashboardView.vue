<template>
  <DefaultLayout>
    <!-- Calendar na parte superior -->
    <div class="calendar-container">
      <Calendar
        @filtro-aplicado="onFiltroAplicado"
        @filtro-limpo="onFiltroLimpo"
        @periodo-alterado="onPeriodoAlterado"
      />
    </div>

    <!-- Gráficos abaixo do calendário -->
    <div class="grid-container1">
      <TicketsByStatus />
      <TicketsPerCompany />
    </div>
    <div class="grid-container2">
      <TicketsPerProduct />
      <TicketsPerCategory />
    </div>
  </DefaultLayout>
  <PrivacyPolicy :visible="showPolicy" @accept="hidePolicy()" />
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Calendar from '@/components/Calendar.vue'
import TicketsByStatus from '@/components/TicketsByStatus.vue'
import TicketsPerProduct from '@/components/TicketsPerProduct.vue'
import TicketsPerCompany from '@/components/TicketsPerCompany.vue'
import TicketsPerCategory from '@/components/TicketsPerCategory.vue'
import PrivacyPolicy from '@/components/PrivacyPolicy.vue'

export default {
  name: 'Dashboard',
  data() {
    return {
      showPolicy: false,
      filtroAtual: null
    }
  },
  components: {
    DefaultLayout,
    Calendar,
    TicketsByStatus,
    TicketsPerProduct,
    TicketsPerCompany,
    TicketsPerCategory,
    PrivacyPolicy
  },
  mounted() {
    if(localStorage.getItem('termoExpirado') == 'true'){
      this.showPolicy = true
    }
  },
  methods: {
    hidePolicy() {
      this.showPolicy = false
    },
    onFiltroAplicado(filtro) {
      this.filtroAtual = filtro
      console.log('Filtro aplicado:', filtro)
      this.atualizarDadosDashboard()
    },
    onFiltroLimpo() {
      this.filtroAtual = null
      console.log('Filtro limpo')
      this.atualizarDadosDashboard()
    },
    onPeriodoAlterado(periodo) {
      console.log('Período alterado:', periodo)
    },
    atualizarDadosDashboard() {
      // Atualizar os componentes do dashboard com base no filtro
      this.$emit('atualizar-dashboard', this.filtroAtual)
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
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.grid-container1 {
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
</style>
