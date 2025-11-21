<template>
  <Dialog
    v-model:visible="internalVisible"
    header="Geração de Relatório"
    modal
    :style="{ width: '700px', height: '800px' }"
  >
  <div class="buttons-report-container">
    <Button class="button-report" type="button" @click="getReport">
      <template #icon>
        <TicketIcon class="w-4 h-4 filter" />
        Gerar Relatório
      </template>
    </Button>

    <Button
    class="button-report"
    type="button"
    label="Exportar PDF"
    icon="pi pi-download"
    @click="getPDF"
    :loading="loadingPDF"
  />
  </div>
    <div class="report-dialog-content">
      <div v-if="loading" class="report-skeleton">
        <Skeleton animation="wave" height="2rem" width="60%" class="mb-3" />
        <br>
        <Skeleton animation="wave" height="1.5rem" width="40%" class="mb-4" />

        <Skeleton animation="wave" height="1rem" width="95%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="85%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="90%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="70%" class="mb-4" />

        <Skeleton animation="wave" height="1.5rem" width="50%" class="mb-3" />

        <Skeleton animation="wave" height="1rem" width="90%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="95%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="80%" class="mb-4" />

        <Skeleton animation="wave" height="1rem" width="35%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="55%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="45%" class="mb-2" />

        <Skeleton animation="wave" height="1.5rem" width="50%" class="mb-3" />

        <Skeleton animation="wave" height="1rem" width="90%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="95%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="80%" class="mb-4" />

        <Skeleton animation="wave" height="1rem" width="35%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="55%" class="mb-2" />
        <Skeleton animation="wave" height="1rem" width="45%" class="mb-2" />
    </div>
  <div v-else v-html="reportHtml"></div>
  </div>

  </Dialog>
</template>
<script>
import { Dialog } from 'primevue'
import Button from 'primevue/button'
import { ReportService } from '@/services/ReportService'
import { marked } from 'marked'
import Skeleton from 'primevue/skeleton';

export default {
  name: 'ReportDialog',
  components: { Dialog, Button, Skeleton },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentFilters: {
      type: Object,
      default: null
    }
  },

  emits: ['update:visible'],

  data() {
    return {
      reportHtml: null,
      loading: false,
      loadingPDF: false
    }
  },

  computed: {
    internalVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },

  methods: {
  async getPDF() {
    this.loadingPDF = true;

    try {
      const service = new ReportService();
      const pdfBlob = await service.getReportPDF();

      const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'relatorio.pdf');
      document.body.appendChild(link);

      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    } finally {
      this.loadingPDF = false;
    }
  },
  async getReport() {
    this.loading = true;
    this.reportHtml = null;

    try {
      const service = new ReportService();
      const markdownResponse = await service.getReport(this.currentFilters);
      this.reportHtml = marked.parse(markdownResponse);

    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
    } finally {
      this.loading = false;
    }
  }
}
}
</script>

<style scoped>

.button-report {
    width: 120px;
    height: 40px;
    background-color: #34495e;
    border: none;
    margin-right: 10px;
}
.report-skeleton .p-skeleton {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 8px;
}

.report-skeleton .skeleton-title {
  margin-bottom: 1.5rem;
}

.report-skeleton .skeleton-subtitle {
  margin-bottom: 1rem;
}

.buttons-report-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
</style>
