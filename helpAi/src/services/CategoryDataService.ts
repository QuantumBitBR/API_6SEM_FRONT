import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface Category{
    category_name: string;
    ticket_count: number;
}

interface CategoryInfo{
    category_id: number;
    category_name: string;
}

interface CategoriesResponse {
    data: Category[];
}

interface CategoriesInfoResponse {
    data: CategoryInfo[];
}

export class CategoryDataService{
    async getCategoryData(): Promise<Category[]>{
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

    async getAllCategories(): Promise<CategoryInfo[]>{
        try {
            const response: AxiosResponse<CategoriesInfoResponse> = await api.get<CategoriesInfoResponse>("/tickets/categories");
            return response.data.data;
        } catch (error) {
            console.error("Error fetching all categories:", error);
            return [];
        }
    }
}
