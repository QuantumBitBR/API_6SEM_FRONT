import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";

interface Status {
  status_name: string;
  ticket_count: number;
}

interface StatusesResponse {
  data: Status[];
}

export class StatusDataService {
  async getStatusData(filter: String): Promise<Status[]> {
    try {
      //continue daqui :)
      //IMPORTANTE: COLOCAR PROPS E WATCH EM TODOS OS COMPONENTES QUE USEM FILTRO (GRAFICOS)
      //o que fazer: vai pegar o objeto filter, verificar o que esta nulo ou nao, e a partir do que nao esta, passar por PARAMS PARAMS PARAMS PARAMS PARAMS.
      console.log("Filtros", filter)
      const response: AxiosResponse<StatusesResponse> = await api.get<StatusesResponse>("/tickets/tickets-by-status");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching status data:", error);
      return [];
    }
  }
}
