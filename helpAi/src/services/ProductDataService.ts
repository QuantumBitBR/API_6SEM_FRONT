import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";

interface Product {
  product_name: string;
  ticket_count: number;
}


interface ProductsResponse {
  data: Product[];
}

export class ProductDataService {
  async getProductData(): Promise<Product[]> {
    try {
      const response: AxiosResponse<ProductsResponse> = await api.get<ProductsResponse>("/tickets/tickets-by-product");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return [];
    }
  }
}
