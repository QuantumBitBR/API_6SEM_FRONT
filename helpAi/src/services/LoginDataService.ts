import {api} from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

      interface LoginResponse {
    user_id: number;
    token: string;
    policy_expired: boolean;
    current_policy: {
    id_policy: number | null;
    text_policy: string | null;
    policy_date: string | null;
  };
}

export class LoginDataService {
  async login(email: string, password: string): Promise<LoginResponse | null> {
    try {
      const credentials = btoa(`${email}:${password}`);
      const response: AxiosResponse<LoginResponse> = await api.post( "/auth/login",
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      if (error.response && error.response.status === 401) {
        throw new Error("Credenciais inválidas");
      } else {
        throw new Error("Erro no sistema, tente novamente mais tarde.");
      }
    }
  }
}
