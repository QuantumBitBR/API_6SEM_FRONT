import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";

export class PrivacyPolicyService {
  async acceptPolicy(data: {userid: number, privacyid: number}): Promise<void> {
    try {

      const response: AxiosResponse<{}> = await api.post('/privacy/accept', data);

      if (response.status != 201){
        throw new Error("Houve algum erro ao aceitar o termo")
      }
    } catch (error) {
      throw new Error("Houve algum erro ao aceitar o termo.")
    }
  }
}
