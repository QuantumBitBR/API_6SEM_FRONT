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
            const params: Record<string, string> = {};
            if(freq == '') freq = null;
            if (period !== null) params.period = period.toString();
            if (freq !== null) params.freq = freq;
            if (start_date !== null) params.start_date = start_date;
            if (product_id !== null) params.id_model = product_id.toString();

            const queryString = new URLSearchParams(params).toString();

            const response: AxiosResponse<DataPredictResponse> = await api.get<DataPredictResponse>(
                `/ia/tendencia?${queryString}`
            );
            return response.data.data;
        } catch (error) {
            console.error("Error fetching predict data:", error);
            return [];
        }
    }
}

export default AIService;