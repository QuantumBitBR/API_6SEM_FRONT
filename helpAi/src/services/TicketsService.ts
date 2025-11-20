import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";
import type { TicketFilters } from "./FiltersDataService";
interface ResponseTicket {
    data: Ticket[]
}
interface Ticket {
  ticketid: number,
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

export class TicketService {
    async getRelatedTickets(filters?: TicketFilters): Promise<Ticket[]> {
        try {
            const response: AxiosResponse<ResponseTicket> = await api.get<ResponseTicket>("/tickets/tickets-details", {
                params: filters,
                paramsSerializer: {
                    indexes: null
                }
            });
            return response.data.data;
        } catch (error) {
            throw new Error("Alguma coisa ocorreu errado. Entre em contato com o seu administrador.")
        }
    }
}
