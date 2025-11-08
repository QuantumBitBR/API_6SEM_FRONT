import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface responseUserDeleted {
    data: UserDeleted
}
interface UserDeleted {
    message: String,
    user_id: number
}

class UserSerice {
    async deleteById(user_id: number): Promise<UserDeleted> {
        try {
            const response: AxiosResponse<responseUserDeleted> = await api.delete<responseUserDeleted>(`/userauth/deletar?user_id=${user_id}`);
            return response.data.data;
        } catch (error: any) {
            throw new Error("Erro no sistema, tente novamente mais tarde.")
        }
    }
}