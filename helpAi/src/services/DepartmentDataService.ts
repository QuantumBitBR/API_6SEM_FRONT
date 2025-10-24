import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";

interface Department {
  department_name: string;
  ticket_count: number;
}

interface DepartmentsResponse {
  data: Department[];
}

export class DepartmentDataService {
  async getDepartmentData(filters?: TicketFilters): Promise<Department[]> {
    try {
      const response: AxiosResponse<DepartmentsResponse> = await api.get<DepartmentsResponse>("/tickets/tickets-by-department", {
        params: filters,
        paramsSerializer: {
          indexes: null
        }
      });

      return response.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
