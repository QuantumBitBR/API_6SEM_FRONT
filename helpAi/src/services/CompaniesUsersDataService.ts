import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface Company {
  company_name: string;
  users: string[];
}

interface CompaniesUsersResponse {
  data: Company[];
}

export class CompaniesUsersDataService {
  /**
   * @returns
   */
  async getCompaniesUsers(): Promise<Company[]> {
    try {
      const response: AxiosResponse<CompaniesUsersResponse> = await api.get<CompaniesUsersResponse>("companies/companies-with-users");

      if (response.data && response.data.data) {
        return response.data.data;
      } else {
        console.error("Resposta da API inválida:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar dados de empresas e usuários:", error);
      return [];
    }
  }
}