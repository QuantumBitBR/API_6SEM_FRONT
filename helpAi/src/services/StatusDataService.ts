import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";

interface Status {
  status_name: string;
  percentage: number;
}

interface ApiStatus {
  status_name: string;
  ticket_count: number;
}

interface StatusesResponse {
  data: ApiStatus[];
}

export class StatusDataService {
  async getStatusData(filters?: TicketFilters): Promise<Status[]> {
    try {
      console.log('🎯 [StatusDataService] Filtros:', filters);

      const response: AxiosResponse<StatusesResponse> = await api.get<StatusesResponse>("/tickets/tickets-by-status", {
        params: filters,
        paramsSerializer: {
          indexes: null
        }
      });

      console.log('📡 [StatusDataService] Resposta:', response.data);

      return response.data.data.map(item => ({
        status_name: item.status_name,
        percentage: item.ticket_count
      }));
    } catch (error) {
      console.error("❌ [StatusDataService] Erro:", error);
      return [];
    }
  }
}
