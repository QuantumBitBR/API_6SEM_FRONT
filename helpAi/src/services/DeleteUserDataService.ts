import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface DeleteUserResponse {
 user_id: number;
}

export class DeleteUsersDataService {
  async deleteUser(userId: number): Promise<DeleteUserResponse | null> {
    try {
      const response: AxiosResponse<DeleteUserResponse> = await api.delete<DeleteUserResponse>(`user/delete?userid=${userId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error deleting user:", error);
      throw new Error("Houve algum erro ao remover o usuário.");
    }
  }
}
