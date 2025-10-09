<template>
  <div class="calendar-filtro">
    <div class="filtro-header">
      <h3>Filtrar por Período</h3>
      <div class="periodo-atual" v-if="periodoSelecionado">
        <i class="pi pi-calendar"></i>
        <span>{{ periodoSelecionado }}</span>
      </div>
    </div>

    <div class="filtro-body">
      <Calendar
        v-model="datasSelecionadas"
        selectionMode="range"
        :manualInput="true"
        :showIcon="true"
        :showButtonBar="true"
        dateFormat="dd/mm/yy"
        placeholder="Selecione o período"
        :minDate="dataMinima"
        :maxDate="dataMaxima"
        :locale="configLocalidade"
        :class="{ 'calendario-erro': temErro }"
        @date-select="onSelecaoData"
        @clear-click="limparFiltro"
      />

      <div v-if="temErro" class="mensagem-erro">
        <i class="pi pi-exclamation-triangle"></i>
        {{ mensagemErro }}
      </div>
    </div>

    <div class="filtro-actions">
      <Button
        label="Aplicar Filtro"
        icon="pi pi-check"
        class="p-button-primary"
        @click="aplicarFiltro"
        :disabled="!periodoValido"
      />
      <Button
        label="Limpar"
        icon="pi pi-times"
        class="p-button-secondary"
        @click="limparFiltro"
      />
      <Button
        label="Últimos 7 dias"
        icon="pi pi-calendar"
        class="p-button-help"
        @click="selecionarPeriodoPredefinido(7)"
      />
      <Button
        label="Últimos 30 dias"
        icon="pi pi-calendar"
        class="p-button-help"
        @click="selecionarPeriodoPredefinido(30)"
      />
    </div>
  </div>
</template>

<script >
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CalendarFiltro',

  props: {
    // Data mínima permitida para seleção
    dataMinima: {
      type: Date,
      default: () => new Date(2020, 0, 1)
    },
    // Data máxima permitida (normalmente hoje)
    dataMaxima: {
      type: Date,
      default: () => new Date()
    },
    // Filtro inicial
    filtroInicial: {
      type: Object,
      default: () => null
    }
  },

  data() {
    return {
      datasSelecionadas: [],
      temErro: false,
      mensagemErro: '',
      configLocalidade: {
        firstDayOfWeek: 0,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        monthNamesShort: [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ],
        today: 'Hoje',
        clear: 'Limpar'
      }
    }
  },

  computed: {
    // Verifica se o período selecionado é válido
    periodoValido() {
      if (!this.datasSelecionadas || this.datasSelecionadas.length !== 2) {
        return false
      }

      const [inicio, fim] = this.datasSelecionadas
      return inicio && fim && inicio <= fim
    },

    // Formata o período selecionado para exibição
    periodoSelecionado() {
      if (!this.periodoValido) return null

      const [inicio, fim] = this.datasSelecionadas
      return `${this.formatarDataDisplay(inicio)} - ${this.formatarDataDisplay(fim)}`
    },

    // Retorna o filtro no formato para a API
    filtroFormatado() {
      if (!this.periodoValido) return null

      const [inicio, fim] = this.datasSelecionadas

      return {
        dataInicio: inicio,
        dataFim: fim,
        dataInicioFormatada: this.formatarDataAPI(inicio),
        dataFimFormatada: this.formatarDataAPI(fim),
        periodoDisplay: this.periodoSelecionado
      }
    }
  },

  watch: {
    // Observa mudanças no filtro inicial
    filtroInicial: {
      handler(novoFiltro) {
        if (novoFiltro && novoFiltro.dataInicio && novoFiltro.dataFim) {
          this.datasSelecionadas = [novoFiltro.dataInicio, novoFiltro.dataFim]
        }
      },
      immediate: true
    }
  },

  mounted() {
    // Define um período padrão (últimos 30 dias) se não houver filtro inicial
    if (!this.filtroInicial && this.datasSelecionadas.length === 0) {
      this.definirPeriodoPadrao()
    }
  },

  methods: {
    // Define período padrão (últimos 30 dias)
    definirPeriodoPadrao() {
      const dataFim = new Date()
      const dataInicio = new Date()
      dataInicio.setDate(dataInicio.getDate() - 30)

      this.datasSelecionadas = [dataInicio, dataFim]
    },

    // Seleciona período predefinido
    selecionarPeriodoPredefinido(dias) {
      const dataFim = new Date()
      const dataInicio = new Date()
      dataInicio.setDate(dataInicio.getDate() - dias)

      this.datasSelecionadas = [dataInicio, dataFim]
      this.aplicarFiltro()
    },

    // Aplica o filtro
    aplicarFiltro() {
      if (!this.validarPeriodo()) {
        return
      }

      this.temErro = false
      this.mensagemErro = ''

      // Emite o evento com os dados do filtro
      this.$emit('filtro-aplicado', this.filtroFormatado)

      // Emite também um evento global para outros componentes
      this.$emit('periodo-alterado', this.filtroFormatado)
    },

    // Limpa o filtro
    limparFiltro() {
      this.datasSelecionadas = []
      this.temErro = false
      this.mensagemErro = ''
      this.$emit('filtro-limpo')
      this.$emit('periodo-alterado', null)
    },

    // Valida o período selecionado
    validarPeriodo() {
      if (!this.datasSelecionadas || this.datasSelecionadas.length !== 2) {
        this.temErro = true
        this.mensagemErro = 'Selecione um período válido'
        return false
      }

      const [inicio, fim] = this.datasSelecionadas

      if (!inicio || !fim) {
        this.temErro = true
        this.mensagemErro = 'Datas inválidas'
        return false
      }

      if (fim < inicio) {
        this.temErro = true
        this.mensagemErro = 'A data final não pode ser anterior à data inicial'
        return false
      }

      if (inicio < this.dataMinima) {
        this.temErro = true
        this.mensagemErro = `A data inicial não pode ser anterior a ${this.formatarDataDisplay(this.dataMinima)}`
        return false
      }

      if (fim > this.dataMaxima) {
        this.temErro = true
        this.mensagemErro = `A data final não pode ser posterior a ${this.formatarDataDisplay(this.dataMaxima)}`
        return false
      }

      return true
    },

    // Formata data para exibição (DD/MM/AAAA)
    formatarDataDisplay(data) {
      if (!data) return ''

      return data.toLocaleDateString('pt-BR')
    },

    // Formata data para API (AAAA-MM-DD)
    formatarDataAPI(data) {
      if (!data) return ''

      return data.toISOString().split('T')[0]
    },

    // Event handler do calendário
    onSelecaoData(event) {
      this.$emit('selecao-alterada', event)
    }
  }
}
</script>

<style scoped>
.calendar-filtro {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filtro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.filtro-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

.periodo-atual {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: #e8f5e8;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #2e7d32;
}

.periodo-atual i {
  font-size: 0.8rem;
}

.filtro-body {
  margin-bottom: 16px;
}

.calendario-erro {
  border: 1px solid #f44336 !important;
}

.mensagem-erro {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #ffebee;
  border: 1px solid #f44336;
  border-radius: 4px;
  color: #c62828;
  font-size: 0.8rem;
}

.mensagem-erro i {
  font-size: 0.8rem;
}

.filtro-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Ajustes para os botões do PrimeVue */
:deep(.p-button) {
  font-size: 0.8rem;
  padding: 6px 12px;
}

:deep(.p-calendar) {
  width: 100%;
}

:deep(.p-datepicker) {
  width: 100%;
}
</style>

)
