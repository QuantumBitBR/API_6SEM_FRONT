import {api} from "@/services/apiConfig";
import type {AxiosResponse} from "axios";

interface Ticket {
   title: string;
  description: string;
  company_name: string;
  product_name: string;
  category_name: string;
  subcategory_name: string;
  priority_name: string;
  status_name: string;
  channel: string;
  device: string;
}

interface TicketResponse {
  data: Ticket[];
  message?: string;
  error?: string;

}

export class TicketSearchService {
  async searchTickets(query: string): Promise<Ticket[]> {
    try {
      const response: AxiosResponse<TicketResponse> = await api.post<TicketResponse>('/find-tickets-key-word', {
       "keyword": query
      });
      return response.data.data;
    } catch (error) {
      console.error("Error searching tickets:", error);
      return [];
    }
  }
}
