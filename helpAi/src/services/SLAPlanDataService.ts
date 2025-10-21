import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";

interface SLAPlan {
  slaplan_name: string;
  percentage: number; 
}

interface SLAPlansResponse {
  data: SLAPlan[];
}

export class SLAPlanDataService {
  async getSLAPlanData(): Promise<SLAPlan[]> {
    try {
      const response: AxiosResponse<SLAPlansResponse> = await api.get<SLAPlansResponse>("/tickets/tickets-by-slaplan");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching SLAPlan data:", error);
      return [];
    }
  }
}