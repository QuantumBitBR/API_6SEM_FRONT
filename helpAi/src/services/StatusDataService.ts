import { api } from "./apiConfig";

import  type  { AxiosResponse } from "axios";

interface Status{
  ticket_status: string;
  ticket_count: number;
}

interface StatusesResponse {
  data: Status[];
}

export class StatusDataService{
  async getStatusData(): Promise<Status[]>{
    try {
      const response: AxiosResponse<StatusesResponse> = await api.get<StatusesResponse>("/tickets/tickets-by-status")
      return response.data.data;
    } catch (error) {
      console.error("Error fetching status data:", error);
      return [];
    }
  }
}
