<template>
  <div>
    <div>
      <TicketsByStatus/>
      <TicketsPerCompany/>
      <TicketsPerProduct/>
    </div>
  </div>
</template>
<script lang="ts">

import TicketsByStatus from '@/components/TicketsByStatus.vue';
import TicketsPerProduct from '@/components/TicketsPerProduct.vue';
import TicketsPerCompany from '@/components/TicketsPerCompany.vue';


  export default {
    components:{
      TicketsByStatus,
      TicketsPerCompany,
      TicketsPerProduct
    }

  }
</script>
<style lang="css">

</style>

