<template>
  <div class="priority-card">
    <div class="card-body">
      <h3 class="quantity">{{ quantity.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} Tickets</h3>
    </div>
    <div class="card-footer" :style="{ backgroundColor: footerColor }">
      <h3 class="title" style="color:black">{{ title }}</h3>
    </div>
  </div>
</template>
<script>
import 'primeicons/primeicons.css';
export default {
  name: "PriorityCard",
  props: {
    title: {
      type: String,
      required: true
    },
    quantity: {
      type: Number
    },
    priority: {
      type: String,
      required: true
    },
     filter: {
            type: Object,
            required: false,
            default: null
        }
  },
  computed: {
    iconStyle() {
      const colors = {
        Critical: "red",
        High: "orange",
        Moderate: "yellow",
        Low: "green"
      };
      return {
        fontSize: "2rem",
        color: colors[this.priority] || "gray"
      };
    },
    footerColor() {
      const colors = {
        Critical: "rgba(255, 0, 0, 0.4)",
        High: "rgba(255, 180, 0, 0.6)",
        Moderate: "rgba(255, 255, 0, 0.6)",
        Low: "rgba(0, 255, 0, 0.6)",
      };
      return colors[this.priority] || "#bdc3c7"; // cinza claro padrão
    }
  },
  watch: {
        filter: {
            handler(newVal, oldVal) {
                if(newVal !== oldVal  )
                this.fetchData();
            },
            deep: true
        }
    }
};
</script>

<style scoped>
.priority-card {
  background-color: #fff;
  border-radius: 8px;
  border: #fff solid 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px 5px;
  height: 150px;
  display: flex;
  flex-direction: column;
  width: 33%;
}

.card-header {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 8px;
  height: 25px;
}

.card-body {
  flex: 1;
  display: flex;
  justify-content:space-evenly;
  align-items: center;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 6px;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  width: 100%;
}
</style>
