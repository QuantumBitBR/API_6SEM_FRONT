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

export interface UserAuthResetPassword {
  id: number;
  message: string;
}

interface ResponseUserAuthResetPassword {
  data: UserAuthResetPassword;
}

export class UserAuthResetPasswordService {
  async resetPassword(userID: number): Promise<UserAuthResetPassword | null> {
    try {
      const response: AxiosResponse<ResponseUserAuthResetPassword> = await api.post(
        `/userauth/resetar-senha`,
        null, // Não envia body, apenas query params
        {
          params: {
            user_id: userID
          }
        }
      );
      return response.data.data;
    } catch (error: any) {
      console.error("Error resetting password:", error);


      if (error.response?.status === 404) {
        throw new Error("Usuário não encontrado");
      } else if (error.response?.status === 500) {
        throw new Error("Erro interno ao resetar senha");
      } else {
        throw new Error("Erro ao resetar senha");
      }
    }
  }
}


