import { api } from "@/services/apiConfig";
import type { AxiosResponse } from "axios";

interface DataPredictResponse{
    data: DataPredict[]
}

interface DataPredict {
    ds: string,
    year: number,
    yhat: number, 
    is_future: boolean
}

class AIService{
    async getPredict(period: number | null, freq: string | null, start_date: string | null, product_id: number | null): Promise<DataPredict[]> {
        try {
            const response: AxiosResponse<DataPredictResponse> = await api.get<DataPredictResponse>(`/ia/tendencia?period=${period}&freq=${freq}&start_date=${start_date}&product_id=${product_id}`)
            
            return response.data.data;
        } catch (error) {
            console.error("Error fetching predict data:", error);
            return [];
        }
    }
}

export default new AIService;