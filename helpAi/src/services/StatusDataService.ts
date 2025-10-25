import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";

interface Status {
  status_name: string;
  percentage: number; // ← CORRETO: o backend retorna percentage
}

interface StatusesResponse {
  data: Status[];
}

export class StatusDataService {
  async getStatusData(filters?: TicketFilters): Promise<Status[]> {
    try {
      const response: AxiosResponse<StatusesResponse> = await api.get<StatusesResponse>("/tickets/tickets-by-status", {
        params: filters,
        paramsSerializer: {
          indexes: null
        }
      });

      // Retornar diretamente, sem mapear - o backend já retorna percentage
      return response.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
