import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";

interface Priority {
  priority_name: string;
  ticket_count: number;
}

interface PrioritiesResponse {
  data: Priority[];
}

export class PriorityDataService {
  async getPriorityData(filters?: TicketFilters): Promise<Priority[]> {
    try {
      console.log('🎯 [PriorityDataService] Filtros:', filters);

      const response: AxiosResponse<PrioritiesResponse> = await api.get<PrioritiesResponse>("/tickets/tickets-by-priority", {
        params: filters,
        paramsSerializer: {
          indexes: null
        }
      });

      console.log('📡 [PriorityDataService] Resposta:', response.data);
      return response.data.data;
    } catch (error) {
      console.error("❌ [PriorityDataService] Erro:", error);
      return [];
    }
  }
}
