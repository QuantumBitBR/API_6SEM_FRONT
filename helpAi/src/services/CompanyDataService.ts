import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";

interface Company {
  company_name: string;
  ticket_count: number;
}

interface CompanyInfo {
  CompanyID: number;
  CompanyName: string;
}

interface CompaniesResponse {
  data: Company[];
}

interface CompaniesInfoResponse {
  data: CompanyInfo[];
}

export class CompanyDataService {
  async getCompanyData(filters?: TicketFilters): Promise<Company[]> {
    try {
      const response: AxiosResponse<CompaniesResponse> = await api.get<CompaniesResponse>("/tickets/tickets-by-company", {
        params: filters,
        paramsSerializer: {
          indexes: null
        }
      });

      return response.data.data;
    } catch (error) {
      console.error("❌ [CompanyDataService] Erro:", error);
      return [];
    }
  }

  async getAllCompanies(): Promise<CompanyInfo[]> {
    try {
      const response: AxiosResponse<CompaniesInfoResponse> = await api.get<CompaniesInfoResponse>("/companies/all-companies");
      return response.data.data;
    } catch (error) {
      console.error("❌ [CompanyDataService] Erro ao buscar empresas:", error);
      return [];
    }
  }
}
