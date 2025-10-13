<template>
  <aside 
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    class="sidebar"
    :class="{ active: isSideBarActive }"
  >
    <div class="sidebar-brand">
      <img src="/HelpAI - Agente.svg" alt="Bot Avatar" class="chat-bot"/>
    </div>
    <ul class="sidebar-links">
      <li v-for="link in links" :key="link.text">
        <!-- Se for logout, chama o método -->
        <a v-if="link.text === 'Sair'" href="#" @click.prevent="logout" class="a_element">
          <component :is="link.icon" class="icon" />
          <span class="link-text">{{link.text}}</span>
        </a>
        <!-- Se não for logout, usa router-link normalmente -->
        <router-link v-else :to="link.href" class="a_element">
          <component :is="link.icon" class="icon" />
          <span class="link-text">{{link.text}}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import {
  ChartBarIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/vue/24/outline";

export default {
  name: "Sidebar",
  components: {
    ChartBarIcon,
    BuildingOfficeIcon,
    MagnifyingGlassIcon,
    ArrowRightOnRectangleIcon
  },
  data() {
    return {
      links: [
        { text: "Dashboard", href: "/dashboard", icon: "ChartBarIcon" },
        { text: "Empresas", href: "/companies", icon: "BuildingOfficeIcon"},
        { text: "Pesquisar", href: "/chat", icon:"MagnifyingGlassIcon"},
        { text: "Sair", href: "/", icon: "ArrowRightOnRectangleIcon"}
      ],
      isSideBarActive: false
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.replace("/");
    },
    handleMouseEnter(){
      this.isSideBarActive = true;
    },
    handleMouseLeave(){
      this.isSideBarActive = false;
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 70px;
  height: 100vh;
  background-color: #34495e;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  transition: width 0.35s ease-out;
  position: relative;
  will-change: width;
}

.sidebar.active {
  width: 200px;
}

.sidebar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  display: flex;
  min-height: 50px;
}

.sidebar.active .sidebar-brand {
  justify-content: flex-start;
}

.sidebar-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-links li {
  margin-bottom: 1.5rem;
}

.sidebar-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.sidebar-links a.router-link-active {
  color: #1abc9c;
  font-weight: bold;
}

.sidebar-links a:hover {
  color: #1abc9c;
  background-color: rgba(255, 255, 255, 0.1);
}

.chat-bot {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: margin 0.2s ease;
}

.sidebar.active .icon {
  margin-right: 12px;
  transition-delay: 0.1s;
}

.link-text {
  opacity: 0;
  white-space: nowrap;
  transform: translateX(-10px);
  transition: 
    opacity 0.15s ease,
    transform 0.15s ease;
}

.sidebar.active .link-text {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.15s;
}

.a_element {
  display: flex;
  align-items: center;
}
</style>