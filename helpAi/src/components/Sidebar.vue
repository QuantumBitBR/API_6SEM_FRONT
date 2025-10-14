<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <img src="/HelpAI - Agente.svg" alt="Bot Avatar" class="chat-bot"/>
    </div>
    <ul class="sidebar-links">
      <li v-for="link in links" :key="link.text">
        <!-- Se for logout, chama o método -->
        <a v-if="link.text === 'Logout'" href="#" @click.prevent="logout">
          {{ link.text }}
        </a>
        <!-- Se não for logout, usa router-link normalmente -->
        <router-link v-else :to="link.href">{{ link.text }}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      links: [
        { text: "Dashboard", href: "/dashboard" },
        { text: "Empresas", href: "/companies" },
        { text: "Pesquisar", href: "/chat" },
        { text: "Inteligência Artificial", href: "/ai" },
        { text: "Sair", href: "/" }
      ]
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.replace("/");
    }
  }
};
</script>


<style scoped>
.sidebar {
  width: 150px;
  height: 100vh;
  background-color: #34495e;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
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
  font-size: large;
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
  width: 70px;
  height: 70px;
  object-fit: contain;
}
</style>
