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

const createOng = async (nome: string, descricao: string): Promise<boolean> => {
  try {
      const ongToCreate = {nome, descricao}

      const data = await Api.post<string>('/ongs', ongToCreate);

      if(data.status === 201){
        return true
      }else{
        return false
      }
      
    } catch (error) {
        console.log(error);
        return false;
    }
  }


  
  
export const ongService = {
    getAllOngs,
    createOng
}