import { Api } from "../../axios-config/AxiosConfig";

export interface IOng{
    id: number;
    nome: string;
    descricao: string;
    updated_at: string;
    created_at: string;
}


const getAllOngs = async (): Promise<IOng[] | undefined> => {
  try {
      const { data } = await Api.get<IOng[]>('/ongs');

      return data;
  
    } catch (error) {
        console.log(error);
        return undefined;
    }
  }

  
  
export const ongService = {
    getAllOngs,
}