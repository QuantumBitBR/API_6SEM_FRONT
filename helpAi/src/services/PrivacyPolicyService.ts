import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
interface ResponseCreate {
  message: string
}
export class PrivacyPolicyService {
  async acceptPolicy(data: { userid: number, privacyid: number }): Promise<void> {
    try {

      const response: AxiosResponse<{}> = await api.post('/privacy/accept', data);

      if (response.status != 201) {
        throw new Error("Houve algum erro ao aceitar o termo")
      }
    } catch (error) {
      throw new Error("Houve algum erro ao aceitar o termo.")
    }
  }

  async create(data: { "text": string, "is_mandatory": boolean }): Promise<string> {
    try {
      const response: AxiosResponse<ResponseCreate> = await api.post('/privacy/create', data);

      if (response.status == 201) {
        return response.data.message;
      } else {
        throw new Error("Houve algum erro ao criar o termo")
      }
    } catch (error) {
      throw new Error("Houve algum erro ao criar o termo")
    }
  }
}
