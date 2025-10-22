import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";

interface SLAPlan {
  slaplan_name: string;
  percentage: number; 
}

type RawSLAPlan = [string, number];

interface RawSLAPlansResponse {
  data: RawSLAPlan[];
}

export class SLAPlanDataService {
  async getSLAPlanData(): Promise<SLAPlan[]> {
    try {
      const response: AxiosResponse<RawSLAPlansResponse> = await api.get<RawSLAPlansResponse>("/tickets/tickets-by-slaplan");
      
      const rawData = response.data.data;

      const mappedData: SLAPlan[] = rawData.map(item => ({
          slaplan_name: item[0],
          percentage: item[1] 
      }));
      
      return mappedData;
    } catch (error) {
      console.error("Error fetching SLAPlan data:", error);
      return [];
    }
  }
}