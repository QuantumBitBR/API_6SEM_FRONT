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
            const response: AxiosResponse<ResponseUserAuthGetUserByID> = await api.get<ResponseUserAuthGetUserByID>(`/userauth/by_id?user_id=${userID}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            return null;
        }
    }
}
