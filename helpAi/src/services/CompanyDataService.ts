import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface Company{
    company_name: string;
    ticket_count: number;
}

interface CompaniesResponse {
    data: Company[];
}

export class CompanyDataService{
    async getCompanyData(): Promise<Company[]>{
        try {
            const response: AxiosResponse<CompaniesResponse> = await api.get<CompaniesResponse>("/tickets/tickets-by-company")
            return response.data.data;
        } catch (error) {
            console.error("Error fetching company data:", error);
            return [];
        }
    }
}