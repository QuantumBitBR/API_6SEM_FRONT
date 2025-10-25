import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";

interface Category {
  category_name: string;
  ticket_count: number;
}

interface CategoryInfo {
  category_id: number;
  category_name: string;
}

interface CategoriesResponse {
  data: Category[];
}

interface CategoriesInfoResponse {
  data: CategoryInfo[];
}

export class CategoryDataService {
  async getCategoryData(filters?: TicketFilters): Promise<Category[]> {
    try {
      const response: AxiosResponse<CategoriesResponse> = await api.get<CategoriesResponse>("/tickets/tickets-by-category", {
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

  async getAllCategories(): Promise<CategoryInfo[]> {
    try {
      const response: AxiosResponse<CategoriesInfoResponse> = await api.get<CategoriesInfoResponse>("/tickets/categories");
      return response.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
