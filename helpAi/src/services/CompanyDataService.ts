import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface Company{
    company_name: string;
    ticket_count: number;
}

class CompanyDataService{
    async getCompanyData(): Promise<Company[]>{
        try {
            const response: AxiosResponse<Company[]> = await api.get<Company[]>("/tickets/tickets-by-company")
            return response.data;
        } catch (error) {
            console.error("Error fetching company data:", error);
            return [];
        }
    }
}