import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface Department{
    department_name: string;
    ticket_count: number;
}

interface DepartmentsResponse {
    data: Department[];
}

export class DepartmentDataService{
    async getDepartmentData(): Promise<Department[]>{
        try {
            const response: AxiosResponse<DepartmentsResponse> = await api.get<DepartmentsResponse>("/tickets/tickets-by-department")
            return response.data.data;
        } catch (error) {
            console.error("Error fetching Department data:", error);
            return [];
        }
    }
}