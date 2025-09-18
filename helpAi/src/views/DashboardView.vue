<template>
  <div>
    <div>
      <TicketsPerCompany/>
      <TicketsPerProduct/>
    </div>
  </div>
</template>
<script lang="ts">
import TicketsPerProduct from '@/components/TicketsPerProduct.vue';
import TicketsPerCompany from '../components/TicketsPerCompany.vue';
  export default {
    components:{
      TicketsPerProduct,
      TicketsPerCompany,
    }

  }
</script>
<style lang="css">

</style>
