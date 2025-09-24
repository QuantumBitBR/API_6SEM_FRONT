<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <img src="/HelpAI - Agente.svg" alt="Bot Avatar" class="chat-bot"/>
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
        { text: "Dashboard", href: "/dashboard" },
        { text: "Empresas", href: "/companies" },
        { text: "Chat", href: "/chat" },
        // { text: "IA", href: "#relatorios" }
      ]
    };
  }
};
</script>

<style scoped>
.sidebar {
  width: 180px;
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
  margin-bottom: 1.5rem;
}

.sidebar-links a {
  color: white;
  text-decoration: none;
  font-size: large;
  font-weight: 00;
  transition: color 0.2s;
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
