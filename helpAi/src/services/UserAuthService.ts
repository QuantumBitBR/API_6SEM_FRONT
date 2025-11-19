import { api } from '@/services/apiConfig'
import type { AxiosResponse } from 'axios'

interface ResponseUserAuthGetUserByID {
    data: UserAuthGetUserByID
}

export interface UserAuthGetUserByID {
    id: number
    name: string
    role: string
    email: string
}

interface userModifyData{
    name: string
    role: string
}

export class UserAuthService {
    async getUserByID(userID: number): Promise<UserAuthGetUserByID | null> {
        try {
            const response: AxiosResponse<ResponseUserAuthGetUserByID> =
                await api.get<ResponseUserAuthGetUserByID>(`/userauth/by_id?user_id=${userID}`)
            return response.data
        } catch (error) {
            console.error('Error fetching user by ID:', error)
            return null
        }
    }

    async modifyUserData(userID: number, name: string, role: string): Promise<any> {
        try {
            const response: AxiosResponse<any> = await api.put<userModifyData>(
                `/userauth/atualizar`,
                {
                    name: name,
                    role: role,
                },
                {
                    params: {
                        user_id: userID,
                    },
                },
            )

            return response.data
        } catch (error) {
            console.error('Error modifying user data:', error)
            return null
        }
    }
}

export class UserAuthResetPasswordService {
  async resetPassword(userID: number): Promise<UserAuthResetPasswordService> {
    try {
      const response: AxiosResponse<UserAuthResetPasswordService> = await api.post(
        `/userauth/resetar-senha`,
        null,
        {
          params: {
            user_id: userID
          }
        }
      );


      return response.data ;

    } catch (error: any) {
      console.error("Error resetting password:", error);


      if (error.response?.status === 404) {
        throw new Error("Usuário não encontrado");
      } else if (error.response?.status === 500) {

        const backendMessage = error.response?.data?.error;
        throw new Error(backendMessage || "Erro interno ao resetar senha");
      } else if (error.code === 'NETWORK_ERROR') {
        throw new Error("Erro de conexão. Verifique sua internet.");
      } else {
        throw new Error(error.response?.data?.error || "Erro ao resetar senha");
      }
    }
  }
}
