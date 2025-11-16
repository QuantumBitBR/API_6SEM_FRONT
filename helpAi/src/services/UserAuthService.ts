import {api} from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface ResponseUserAuthGetUserByID {
    data: UserAuthGetUserByID
}

export interface UserAuthGetUserByID {
    id: number,
    name: string,
    role: string,
    email: string,

}
export class UserAuthService {
    async getUserByID(userID: number): Promise<UserAuthGetUserByID | null> {
        try {
            const response: AxiosResponse<ResponseUserAuthGetUserByID> = await api.get<ResponseUserAuthGetUserByID>(`/userauth/user-authentication/${userID}`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            return null;
        }
    }
}
export interface UserAuthResetPassword {
  id: number,
  message: string
}

interface ResponseUserAuthResetPassword {
  data: UserAuthResetPassword
}

export class UserAuthResetPasswordService {
    async resetPassword(userID: number): Promise<UserAuthResetPassword | null> {
        try {
            // Endpoint correto, sem body, user_id na query string
            const response: AxiosResponse<ResponseUserAuthResetPassword> = await api.post(
                `/userauth/resetar-senha`,
                null,
                { params: { user_id: userID } }
            );
            return response.data.data;
        } catch (error) {
            console.error("Error resetting password:", error);
            return null;
        }
    }
}
