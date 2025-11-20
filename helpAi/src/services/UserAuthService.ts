import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios"

interface ResponseUserAuthCreateUser {
    data: UserAuthCreateUser
}

export interface UserAuthCreateUser {
    name: string,
    role: string,
    email: string
}

interface ResponseUserAuthGetUserByID {
    data: UserAuthGetUserByID
}

export interface UserAuthGetUserByID {
    id: number
    name: string
    role: string
    email: string
}

interface userModifyData {
    name: string
    role: string
}
interface ResponseResetPasswordEmail{
    id: number, 
    message: String
}
export class UserAuthService {
    async createUser(user: UserAuthCreateUser): Promise<String> {
        try {
            const response = await api.post<ResponseUserAuthCreateUser>("userauth/criar", user);

            return "Usuário criado com sucesso";

        } catch (error: any) {
            if (error.status == 409) {
                throw new Error("Este usuário já existe no sistema!");
            }
            throw new Error("Erro ao criar usuário. Entre contato com o administrador");
        }
    }
    async getUserByID(userID: number): Promise<ResponseUserAuthGetUserByID | null> {
        try {
            const response: AxiosResponse<ResponseUserAuthGetUserByID> =
                await api.get<ResponseUserAuthGetUserByID>(`/userauth/by_id?user_id=${userID}`)
            return response.data;
        } catch (error) {
            throw new Error("Erro ao buscar os dados");
        }
    }

    async getAllUsers(page: number): Promise<any> {
        try {
            const response: AxiosResponse<any> = await api.get(`/userauth/listar`, {
                params: {
                    page: page,
                },
            })
            return response.data
        } catch (error) {
            console.error('Error getting all users:', error)
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

    async resetPassword(userID: number): Promise<String> {
        try {
            const response: AxiosResponse<ResponseResetPasswordEmail> = await api.post(
                `/userauth/resetar-senha`,
                null,
                {
                    params: {
                        user_id: userID
                    }
                }
            );


            return response.data.message;

        } catch (error: any) {
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