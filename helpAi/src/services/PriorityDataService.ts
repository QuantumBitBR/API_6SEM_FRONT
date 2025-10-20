import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface Priority{
    name: string;
    ticket_count: number;
}

interface PrioritiesResponse {
    data: Priority[];
}

export class PriorityDataService{
    async getPriorityData(): Promise<Priority[]>{
        try {
            const response: AxiosResponse<PrioritiesResponse> = await api.get<PrioritiesResponse>("/tickets/tickets-by-priority")
            return response.data.data;
        } catch (error) {
            console.error("Error fetching Priority data:", error);
            return [];
        }
    }
}