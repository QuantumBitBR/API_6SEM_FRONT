import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";

interface Product {
  product_name: string;
  ticket_count: number;
}

interface ProductInfo {
  ProductID: number;
  ProductName: string;
}

interface ProductsResponse {
  data: Product[];
}

interface ProductsInfoResponse {
  data: ProductInfo[];
}

export class ProductDataService {
  async getProductData(filters?: TicketFilters): Promise<Product[]> {
    try {
      console.log('🎯 [ProductDataService] Filtros:', filters);

      const response: AxiosResponse<ProductsResponse> = await api.get<ProductsResponse>("/tickets/tickets-by-product", {
        params: filters,
        paramsSerializer: {
          indexes: null
        }
      });

      console.log('📡 [ProductDataService] Resposta:', response.data);
      return response.data.data;
    } catch (error) {
      console.error("❌ [ProductDataService] Erro:", error);
      return [];
    }
  }

  async getAllProducts(): Promise<ProductInfo[]> {
    try {
      console.log('🎯 [ProductDataService] Buscando todos produtos');

      const response: AxiosResponse<ProductsInfoResponse> = await api.get<ProductsInfoResponse>("/products/all-products");

      console.log('📡 [ProductDataService] Todos produtos:', response.data);
      return response.data.data;
    } catch (error) {
      console.error("❌ [ProductDataService] Erro ao buscar produtos:", error);
      return [];
    }
  }
}
