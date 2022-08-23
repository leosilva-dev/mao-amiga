import { Api } from "../../axios-config/AxiosConfig";
import { v4 as uuidv4 } from 'uuid';

export interface IOng{
    id: number;
    nome: string;
    descricao: string;
    nhost_id: string;
    updated_at: string;
    created_at: string;
}

const generateNhostId = ():string => {
  return uuidv4()
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

const createOng = async (nome: string, descricao: string, nhost_id:string): Promise<boolean> => {
  try {
      const ongToCreate = {nome, descricao, nhost_id}

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
  generateNhostId,
    getAllOngs,
    createOng
}