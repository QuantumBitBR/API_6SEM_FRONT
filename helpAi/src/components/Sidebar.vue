<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      MeuSite
    </div>
    <ul class="sidebar-links">
      <li v-for="link in links" :key="link.text">
        <a :href="link.href">{{ link.text }}</a>
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
        { text: "Dashboard", href: "#dashboard" },
        { text: "Usuários", href: "#usuarios" },
        { text: "Configurações", href: "#configuracoes" },
        { text: "Relatórios", href: "#relatorios" }
      ]
    };
  }
};
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  background-color: #34495e; /* cor diferente da navbar */
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
  margin-bottom: 1rem;
}

.sidebar-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.sidebar-links a:hover {
  color: #1abc9c; /* hover com cor de destaque */
}
</style>
