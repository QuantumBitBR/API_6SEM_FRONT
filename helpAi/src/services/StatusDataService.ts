import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";

interface Status {
  status_name: string;
  ticket_count: number;
}

interface ApiStatus {
  status_name: string;
  percentage: number; 
}

interface StatusesResponse {
  data: ApiStatus[];
}

export class StatusDataService {
  async getStatusData(filters?: TicketFilters): Promise<Status[]> {
    try {
      const response: AxiosResponse<StatusesResponse> = await api.get<StatusesResponse>("/tickets/tickets-by-status", {
        params: filters
      });


      return response.data.data.map(item => ({
        status_name: item.status_name,
        ticket_count: item.percentage
      }));
    } catch (error) {
      console.error("Error fetching status data:", error);
      return [];
    }
  }
}
