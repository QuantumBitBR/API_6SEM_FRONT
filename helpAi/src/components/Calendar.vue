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
      <div class="calendario-container">
        <label for="calendario-range">Selecione o período</label>
        <Calendar
          id="calendario-range"
          v-model="datasSelecionadas"
          selectionMode="range"
          :manualInput="false"
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
      </div>

      <div v-if="temErro" class="mensagem-erro">
        <i class="pi pi-exclamation-triangle"></i>
        {{ mensagemErro }}
      </div>

      <!-- Exibição das datas selecionadas -->
      <div v-if="datasSelecionadas && datasSelecionadas.length === 2" class="datas-selecionadas">
        <div class="data-item">
          <strong>Data Inicial:</strong>
          <span>{{ formatarDataDisplay(datasSelecionadas[0]) }}</span>
        </div>
        <div class="data-item">
          <strong>Data Final:</strong>
          <span>{{ formatarDataDisplay(datasSelecionadas[1]) }}</span>
        </div>
      </div>
    </div>

    <div class="filtro-actions">
      <Button
        label="Aplicar Filtro"
        icon="pi pi-check"
        class="p-button-primary azul-primario"
        @click="aplicarFiltro"
        :disabled="!periodoValido"
      />
      <Button
        label="Limpar"
        icon="pi pi-times"
        class="p-button-secondary azul-secundario"
        @click="limparFiltro"
      />
      <Button
        label="Últimos 60 dias"
        icon="pi pi-calendar"
        class="p-button-outline azul-outline"
        @click="selecionarPeriodoPredefinido(60)"
      />
      <Button
        label="Próximos 60 dias"
        icon="pi pi-calendar"
        class="p-button-outline azul-outline"
        @click="selecionarPeriodoFuturo(60)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarFiltro',

  props: {
    // Data mínima permitida para seleção (60 dias atrás)
    dataMinima: {
      type: Date,
      default: function() {
        const data = new Date()
        data.setDate(data.getDate() - 60)
        return data
      }
    },
    // Data máxima permitida (60 dias à frente)
    dataMaxima: {
      type: Date,
      default: function() {
        const data = new Date()
        data.setDate(data.getDate() + 60)
        return data
      }
    },
    // Filtro inicial
    filtroInicial: {
      type: Object,
      default: function() {
        return null
      }
    }
  },

  data: function() {
    return {
      datasSelecionadas: null,
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
    periodoValido: function() {
      return this.datasSelecionadas &&
             this.datasSelecionadas.length === 2 &&
             this.datasSelecionadas[0] &&
             this.datasSelecionadas[1] &&
             this.datasSelecionadas[0] <= this.datasSelecionadas[1]
    },

    periodoSelecionado: function() {
      if (!this.periodoValido) return null
      return this.formatarPeriodoDisplay(this.datasSelecionadas[0], this.datasSelecionadas[1])
    },

    filtroFormatado: function() {
      if (!this.periodoValido) return null

      return {
        dataInicio: this.datasSelecionadas[0],
        dataFim: this.datasSelecionadas[1],
        dataInicioFormatada: this.formatarDataAPI(this.datasSelecionadas[0]),
        dataFimFormatada: this.formatarDataAPI(this.datasSelecionadas[1]),
        periodoDisplay: this.periodoSelecionado
      }
    }
  },

  watch: {
    filtroInicial: {
      handler: function(novoFiltro) {
        if (novoFiltro && novoFiltro.dataInicio && novoFiltro.dataFim) {
          this.datasSelecionadas = [
            new Date(novoFiltro.dataInicio),
            new Date(novoFiltro.dataFim)
          ]
        }
      },
      immediate: true
    }
  },

  mounted: function() {
    if (!this.filtroInicial && !this.datasSelecionadas) {
      this.definirPeriodoPadrao()
    }
  },

  methods: {
    definirPeriodoPadrao: function() {
      const dataFim = new Date()
      const dataInicio = new Date()
      dataInicio.setDate(dataInicio.getDate() - 30)
      this.datasSelecionadas = [dataInicio, dataFim]
    },

    selecionarPeriodoPredefinido: function(dias) {
      const dataFim = new Date()
      const dataInicio = new Date()
      dataInicio.setDate(dataInicio.getDate() - dias)
      this.datasSelecionadas = [dataInicio, dataFim]
      this.aplicarFiltro()
    },

    selecionarPeriodoFuturo: function(dias) {
      const dataInicio = new Date()
      const dataFim = new Date()
      dataFim.setDate(dataFim.getDate() + dias)
      this.datasSelecionadas = [dataInicio, dataFim]
      this.aplicarFiltro()
    },

    aplicarFiltro: function() {
      if (!this.validarPeriodo()) {
        return
      }

      this.temErro = false
      this.mensagemErro = ''

      this.$emit('filtro-aplicado', this.filtroFormatado)
      this.$emit('periodo-alterado', this.filtroFormatado)
    },

    limparFiltro: function() {
      this.datasSelecionadas = null
      this.temErro = false
      this.mensagemErro = ''
      this.$emit('filtro-limpo')
      this.$emit('periodo-alterado', null)
    },

    validarPeriodo: function() {
      if (!this.datasSelecionadas || this.datasSelecionadas.length !== 2) {
        this.temErro = true
        this.mensagemErro = 'Selecione um período válido'
        return false
      }

      const inicio = this.datasSelecionadas[0]
      const fim = this.datasSelecionadas[1]

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

      const dataMinima = this.dataMinima
      if (inicio < dataMinima) {
        this.temErro = true
        this.mensagemErro = 'A data inicial não pode ser anterior a ' + this.formatarDataDisplay(dataMinima)
        return false
      }

      const dataMaxima = this.dataMaxima
      if (fim > dataMaxima) {
        this.temErro = true
        this.mensagemErro = 'A data final não pode ser posterior a ' + this.formatarDataDisplay(dataMaxima)
        return false
      }

      return true
    },

    formatarDataDisplay: function(data) {
      if (!data) return ''
      return data.toLocaleDateString('pt-BR')
    },

    formatarPeriodoDisplay: function(dataInicio, dataFim) {
      return this.formatarDataDisplay(dataInicio) + ' - ' + this.formatarDataDisplay(dataFim)
    },

    formatarDataAPI: function(data) {
      if (!data) return ''
      return data.toISOString().split('T')[0]
    },

    onSelecaoData: function(event) {
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
  background-color: #e3f2fd;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #1976d2;
}

.periodo-atual i {
  font-size: 0.8rem;
}

.filtro-body {
  margin-bottom: 16px;
}

.calendario-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.calendario-container label {
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
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

.datas-selecionadas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.data-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.data-item strong {
  font-size: 0.8rem;
  color: #6c757d;
}

.data-item span {
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
}

.filtro-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Estilos personalizados para botões em tons de azul */
:deep(.azul-primario) {
  background: #1976d2 !important;
  border-color: #1976d2 !important;
}

:deep(.azul-primario:hover) {
  background: #1565c0 !important;
  border-color: #1565c0 !important;
}

:deep(.azul-secundario) {
  background: #42a5f5 !important;
  border-color: #42a5f5 !important;
  color: white !important;
}

:deep(.azul-secundario:hover) {
  background: #1e88e5 !important;
  border-color: #1e88e5 !important;
}

:deep(.azul-outline) {
  background: transparent !important;
  color: #1976d2 !important;
  border-color: #1976d2 !important;
}

:deep(.azul-outline:hover) {
  background: #e3f2fd !important;
  color: #1565c0 !important;
  border-color: #1565c0 !important;
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

/* Responsividade */
@media (max-width: 768px) {
  .datas-selecionadas {
    grid-template-columns: 1fr;
  }

  .filtro-actions {
    flex-direction: column;
  }
}
</style>
