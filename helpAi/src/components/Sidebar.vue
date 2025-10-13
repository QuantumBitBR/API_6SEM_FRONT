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
          <span v-show="showText">{{link.text}}</span>
        </a>
        <!-- Se não for logout, usa router-link normalmente -->
        <router-link v-else :to="link.href" class="a_element">
          <component :is="link.icon" class="icon" />
          <span v-show="showText">{{link.text}}</span>
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
      isSideBarActive: false,
      showText: false
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.replace("/");
    },
    handleMouseEnter(){
      this.isSideBarActive = true;

      setTimeout(()=>{
        this.showText = true;
      }, 450)
    },
    handleMouseLeave(){
      this.isSideBarActive = false;
      this.showText = false;
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
  /* overflow: hidden; */
  transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  will-change: width, box-shadow;
}


.sidebar:hover {
  width: 200px; /* expandida */
}

.sidebar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.sidebar-links {
  list-style: none;
  padding: 0;
}

.sidebar-links li {
  margin-bottom: 1.5rem;
}

.sidebar-links a {
  color: white;
  text-decoration: none;
  /* font-size: large; */
  font-weight: 500;
  transition: color 0.2s;
}

.sidebar-links a.router-link-active {
  color: #1abc9c;
  font-weight: bold;
}

.sidebar-links a:hover {
  color: #1abc9c;
}

.chat-bot {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.icon {
  width: 20px;
  height: 20px;
  margin: 5px;
}

.a_element{
  display: flex;
  align-items: center;
}
</style>
