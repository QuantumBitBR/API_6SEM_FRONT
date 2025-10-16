<template>
  <div class="app-container">
    <Sidebar />

    <div class="main-area">
      <Navbar />
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'DefaultLayout',
  components: { Sidebar, Navbar }
}
</script>

<style>
.app-container {
  display: flex;
  height: 100vh;
}

.main-area {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
