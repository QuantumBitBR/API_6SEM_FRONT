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
