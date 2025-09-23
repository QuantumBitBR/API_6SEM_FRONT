<template>
  <div>
    <div>
      <TicketsPerCompany/>
      <TicketsPerProduct/>
      <TicketsPerCategory/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TicketsPerProduct from '@/components/TicketsPerProduct.vue';
import TicketsPerCompany from '../components/TicketsPerCompany.vue';
import TicketsPerCategory from '@/components/TicketsPerCategory.vue';


export default defineComponent({
  name: 'DashboardView',
  components: {
    TicketsPerProduct,
    TicketsPerCompany,
    TicketsPerCategory
  }
});
</script>

<style lang="css">

</style>