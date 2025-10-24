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
      console.log('🎯 [CategoryDataService] Filtros:', filters);

      const response: AxiosResponse<CategoriesResponse> = await api.get<CategoriesResponse>("/tickets/tickets-by-category", {
        params: filters,
        paramsSerializer: {
          indexes: null
        }
      });

      console.log('📡 [CategoryDataService] Resposta:', response.data);
      return response.data.data;
    } catch (error) {
      console.error("❌ [CategoryDataService] Erro:", error);
      return [];
    }
  }

  async getAllCategories(): Promise<CategoryInfo[]> {
    try {
      console.log('🎯 [CategoryDataService] Buscando todas categorias');

      const response: AxiosResponse<CategoriesInfoResponse> = await api.get<CategoriesInfoResponse>("/tickets/categories");

      console.log('📡 [CategoryDataService] Todas categorias:', response.data);
      return response.data.data;
    } catch (error) {
      console.error("❌ [CategoryDataService] Erro ao buscar categorias:", error);
      return [];
    }
  }
}
