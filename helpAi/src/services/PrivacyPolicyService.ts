import { api } from "./apiConfig";
import type { AxiosResponse } from "axios";
interface ResponseCreate {
  message: string
}
interface PrivacyPolicy {
  id: number,
  text: string,
  validity_date: string,
  is_mandatory: boolean,
  is_accept: boolean
}
interface ResponsePrivacy{
  data: PrivacyPolicy[]
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
      console.log(response)
      if (response.status == 201) {
        return response.data.message;
      } else {
        throw new Error("Houve algum erro ao criar o termo")
      }
    } catch (error) {
      throw new Error("Houve algum erro ao criar o termo")
    }
  }

  async getAllByUser(userid: number): Promise<PrivacyPolicy[]>{
    try{
      const response : AxiosResponse<ResponsePrivacy> = await api.get(`/privacy/get-by-user?userid=${userid}`)
      if(response.status == 200){
        return response.data.data;
      }else{
        throw new Error("Houve algum erro ao criar o termo")
      }
    }catch(error){
      throw new Error("Houve algum erro ao criar o termo")
    }
  }
}
