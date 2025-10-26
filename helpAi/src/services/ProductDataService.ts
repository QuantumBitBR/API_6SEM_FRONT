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
      const response: AxiosResponse<ProductsResponse> = await api.get<ProductsResponse>("/tickets/tickets-by-product", {
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

  async getAllProducts(): Promise<ProductInfo[]> {
    try {
      const response: AxiosResponse<ProductsInfoResponse> = await api.get<ProductsInfoResponse>("/products/all-products");
      return response.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getAllProductsAI(): Promise<ProductInfo[]> {
    try {
      const response: AxiosResponse<ProductsInfoResponse> = await api.get<ProductsInfoResponse>("/products/all-products-ai");
      return response.data.data;
    } catch (error : any) {
      throw new Error(String(error.message));
    }
  }
}
