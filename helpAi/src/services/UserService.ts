import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface responseUserDeleted {
    data: UserDeleted
}
interface UserDeleted {
    message: String,
    user_id: number
}

export class UserService {
    async deleteById(user_id: number): Promise<UserDeleted> {
        try {
            const response: AxiosResponse<responseUserDeleted> = await api.delete(`/userauth/deletar`, {
                params: { user_id }
            });

            return response;
        } catch (error: any) {
            throw new Error("Erro no sistema, tente novamente mais tarde.");
        }
    }
}

