<template>
  <nav class="navbar">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <span v-for="(item, index) in breadcrumbs" :key="index">
        <a v-if="index !== breadcrumbs.length - 1" href="/">{{ item }}</a>
        <span v-else>{{ item }}</span>
        <span v-if="index !== breadcrumbs.length - 1"> &gt; </span>
      </span>
    </div>

    <div class="user-avatar">
      <img :src="userAvatar" alt="User Avatar" />
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      breadcrumbs: ["Home", "Dashboard"],
      userAvatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png"
    };
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  padding: 0.5rem 1rem;
  color: white;
  height: 60px;
}

.breadcrumb a {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb span {
  font-weight: 500;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
}
</style>
