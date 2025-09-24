<template>
  <div>
    <div>
      <PrivacyPolicy :visible="true" :effective-date="'2024-12-01'" :privacy-text="'TERMO'" />
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
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';
  export default {
    components:{
      TicketsByStatus,
      TicketsPerCompany,
      TicketsPerCategory,
      TicketsPerProduct,
      PrivacyPolicy
    }
  }
</script>

<style lang="css">

</style>

