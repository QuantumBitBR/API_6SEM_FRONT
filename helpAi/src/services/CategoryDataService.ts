import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";

interface Category {
    category_name: string;
    ticket_count: number;
}

interface CategoriesResponse {
    data: Category[];
}

export class CategoryDataService {
    async getCategoryData(filters?: TicketFilters): Promise<Category[]> {
        try {
            const response: AxiosResponse<CategoriesResponse> = await api.get<CategoriesResponse>("/tickets/tickets-by-category", {
                params: filters
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching Category data:", error);
            return [];
        }
    }
}
