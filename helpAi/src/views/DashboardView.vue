<template>
  <DefaultLayout>
    <div class="grid-container1">
      <TicketsByStatus />
      <TicketsPerCompany />
    </div>
    <div class="grid-container2">
      <TicketsPerProduct />
      <TicketsPerCategory />
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TicketsByStatus from '@/components/TicketsByStatus.vue'
import TicketsPerProduct from '@/components/TicketsPerProduct.vue'
import TicketsPerCompany from '@/components/TicketsPerCompany.vue'
import TicketsPerCategory from '@/components/TicketsPerCategory.vue'

export default {
  name: 'Dashboard',
  components: {
    DefaultLayout,
    TicketsByStatus,
    TicketsPerProduct,
    TicketsPerCompany,
    TicketsPerCategory
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
}
</style>
