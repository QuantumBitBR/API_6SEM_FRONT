import { api } from "./apiConfig";
import type { TicketFilters } from "./FiltersDataService";

export class ReportService {
  async getReport(filters?: TicketFilters){
    try {
      const response = await api.get('/tickets/report', {
        params: filters,
        paramsSerializer: {
          indexes: null
        }
      });

      if (response.status == 200) {
        return response.data;
      }
      else{
        throw new Error("Houve algum erro ao gerar o relatório")
      }
    } catch (error) {
        throw new Error("Erro ao gerar o relatório: " + error);
    }
  }
}
