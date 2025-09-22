<template>
  <div>
    <div>
      <TicketsByStatus/>
      <TicketsPerCompany/>
      <TicketsPerProduct/>
      <TicketsPerCategory/>
    </div>
  </div>
</template>
<script lang="ts">

import TicketsByStatus from '@/components/TicketsByStatus.vue';
import TicketsPerProduct from '@/components/TicketsPerProduct.vue';
import TicketsPerCompany from '../components/TicketsPerCompany.vue';
import TicketsPerCategory from '@/components/TicketsPerCategory.vue';
  export default {
    components:{
      TicketsByStatus,
      TicketsPerCompany,
      TicketsPerCategory,
      TicketsPerProduct
    }

  }
</script>
<style lang="css">

</style>

