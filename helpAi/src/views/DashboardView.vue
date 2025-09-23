<template>
  <div>
    <div>
      <TicketsPerCompany/>
      <TicketsPerProduct/>
      <TicketsPerCategory/>
    </div>

    <button @click="showCompaniesModal = true" class="btn-open-modal">
      Ver Empresas e Usuários
    </button>
    <CompaniesUsersView v-if="showCompaniesModal" @close="showCompaniesModal = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TicketsPerProduct from '@/components/TicketsPerProduct.vue';
import TicketsPerCompany from '../components/TicketsPerCompany.vue';
import TicketsPerCategory from '@/components/TicketsPerCategory.vue';
import CompaniesUsersView from "@/views/CompaniesUsersView.vue";


export default defineComponent({
  name: 'DashboardView',
  components: {
    TicketsPerProduct,
    TicketsPerCompany,
    TicketsPerCategory,
    CompaniesUsersView
  },
  setup() {
    const showCompaniesModal = ref(false);
    return { showCompaniesModal };
  }
});
</script>

<style lang="css">
.btn-open-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  z-index: 999;
}
</style>