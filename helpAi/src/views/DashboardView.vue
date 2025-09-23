<template>
  <div>
    <div class="grid-container1">
      <TicketsByStatus />
      <TicketsPerCompany />
    </div>
    <div class="grid-container2">
      <TicketsPerProduct />
      <TicketsPerCategory />
    </div>
  </div>
</template>
<script lang="ts">
import TicketsByStatus from '@/components/TicketsByStatus.vue'
import TicketsPerProduct from '@/components/TicketsPerProduct.vue'
import TicketsPerCompany from '../components/TicketsPerCompany.vue'
import TicketsPerCategory from '@/components/TicketsPerCategory.vue'
export default {
  components: {
    TicketsByStatus,
    TicketsPerCompany,
    TicketsPerCategory,
    TicketsPerProduct,
  },
}
</script>
<style lang="css">

.grid-container1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  padding: 20px 0 0;
}

.grid-container2 {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 10px;
  width: 100%;
  height: 20px;
  padding: 20px 0 0 0;
}
</style>
