<template>
  <div class="calendar-filter-compact">
    <div class="filter-field">
      <label for="calendar-input" class="filter-label">Período</label>
      <Calendar
        id="calendar-input"
        v-model="datasSelecionadas"
        selectionMode="range"
        :manualInput="false"
        :showIcon="true"
        dateFormat="dd/mm/yy"
        placeholder="Selecione"
        :minDate="dataMinima"
        :maxDate="dataMaxima"
        :locale="configLocalidade"
        :class="{ 'calendar-error': temErro }"
        @date-select="onSelecaoData"
        @clear-click="limparFiltro"
      />

      <div v-if="temErro" class="error-message">
        <i class="pi pi-exclamation-triangle"></i>
        {{ mensagemErro }}
      </div>
    </div>

    <!-- Display compacto do período selecionado -->
    <div v-if="periodoSelecionado" class="selected-period">
      <span class="period-text">{{ periodoSelecionado }}</span>
      <Button
        icon="pi pi-times"
        class="p-button-text p-button-sm clear-btn"
        @click="limparFiltro"
      />
    </div>
  </div>
</template>

<script>
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'

export default {
  name: 'CalendarFilterCompact',

  components: {
    Calendar,
    Button
  },

  props: {
    dataMinima: {
      type: Date,
      default: function() {
        const data = new Date()
        data.setDate(data.getDate() - 60)
        return data
      }
    },
    dataMaxima: {
      type: Date,
      default: function() {
        const data = new Date()
        data.setDate(data.getDate() + 60)
        return data
      }
    },
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
      return this.formatarPeriodoCompacto(this.datasSelecionadas[0], this.datasSelecionadas[1])
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
    },

    datasSelecionadas: {
      handler: function(novasDatas) {
        if (this.periodoValido) {
          this.temErro = false
          this.mensagemErro = ''
          this.$emit('filtro-aplicado', this.filtroFormatado)
          this.$emit('periodo-alterado', this.filtroFormatado)
        } else if (novasDatas && novasDatas.length === 2) {
          // Se há seleção mas é inválida
          this.validarPeriodo()
        }
      },
      deep: true
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
        this.mensagemErro = 'Data inicial muito antiga'
        return false
      }

      const dataMaxima = this.dataMaxima
      if (fim > dataMaxima) {
        this.temErro = true
        this.mensagemErro = 'Data final muito futura'
        return false
      }

      return true
    },

    formatarPeriodoCompacto: function(dataInicio, dataFim) {
      const inicio = dataInicio.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      const fim = dataFim.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      return `${inicio} - ${fim}`
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
.calendar-filter-compact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 25%;
  min-width: 120px;
  max-width: 150px;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.filter-label {
  font-weight: 500;
  color: #333;
  font-size: 1rem;
  margin-bottom: 1px;
}

.calendar-error {
  border: 1px solid #f44336 !important;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.65rem;
  color: #d32f2f;
  margin-top: 2px;
}

.error-message i {
  font-size: 0.6rem;
}

.selected-period {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 6px;
  background-color: #e3f2fd;
  border-radius: 3px;
  border: 1px solid #bbdefb;
  font-size: 0.7rem;
}

.period-text {
  font-size: 0.7rem;
  color: #1976d2;
  font-weight: 500;
}

.clear-btn {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}

.clear-btn :deep(.p-button-icon) {
  font-size: 0.5rem;
}


:deep(.p-calendar) {
  width: 100%;
}

:deep(.p-inputtext) {
  width: 100%;
  font-size: 0.75rem;
  padding: 0.3rem 0.4rem;
}

:deep(.p-calendar .p-datepicker) {
  min-width: 220px;
  transform: scale(0.8);
  transform-origin: top left;
}

:deep(.p-datepicker table) {
  font-size: 0.75rem;
}

:deep(.p-datepicker .p-datepicker-header) {
  padding: 0.3rem;
}

:deep(.p-datepicker .p-datepicker-calendar th),
:deep(.p-datepicker .p-datepicker-calendar td) {
  padding: 0.15rem;
}

:deep(.p-datepicker .p-datepicker-calendar td > span) {
  width: 1.6rem;
  height: 1.6rem;
  line-height: 1.6rem;
}

:deep(.p-calendar .p-button) {
  width: 1.8rem;
  height: 1.8rem;
}

:deep(.p-calendar .p-button .p-button-icon) {
  font-size: 0.7rem;
}


@media (max-width: 768px) {
  .calendar-filter-compact {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }

  :deep(.p-calendar .p-datepicker) {
    min-width: 250px;
    transform: scale(0.85);
    transform-origin: top center;
  }
}

@media (max-width: 480px) {
  :deep(.p-calendar .p-datepicker) {
    min-width: 230px;
    transform: scale(0.75);
    transform-origin: top center;
  }
}
</style>
