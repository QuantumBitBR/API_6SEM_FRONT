<template>
  <nav class="navbar">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <span v-for="(item, index) in breadcrumbs" :key="index">
        <router-link
          v-if="index !== breadcrumbs.length - 1"
          :to="item.to"
          class="crumb-link"
        >
          {{ capitalize(item.label) }}
        </router-link>
        <span v-else>{{ capitalize(item.label) }}</span>
        <span v-if="index !== breadcrumbs.length - 1"> &gt; </span>
      </span>
    </div>

    <div class="user-avatar" @click="toUserProfile()">
      <img :src="userAvatar" alt="User Avatar" />
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      userAvatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      breadcrumbs: []
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.updateBreadcrumbs(to);
      }
    }
  },
  methods: {
    updateBreadcrumbs(route) {
      this.breadcrumbs = route.matched.map(r => ({
        label: r.meta?.breadcrumb || r.name,
        to: r.path
      }));
    },
    capitalize(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    toUserProfile() {
      this.$router.push("/profile");
    }
  }
}
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

.breadcrumb {
  font-weight: 500;
}

.crumb-link {
  color: #ecf0f1;
  text-decoration: none;
}

.crumb-link:hover {
  text-decoration: underline;
}

.user-avatar {
  cursor: pointer;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
}
</style>
