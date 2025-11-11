import {api} from "@/services/apiConfig";
import type { AxiosResponse } from "axios"

interface ResponseUserAuthCreateUser {
    data: UserAuthCreateUser
}

export interface UserAuthCreateUser {
    name: string,
    role: string,
    email: string,
    password: string
}

export class UserAuthService {
    async createUser(user: UserAuthCreateUser): Promise<AxiosResponse<ResponseUserAuthCreateUser>> {
      try {
          return await api.post<ResponseUserAuthCreateUser>("/criar", user);
      } catch {
          throw new Error("Erro ao criar usuário");
      }
    }
}

