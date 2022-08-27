import { Api } from "../../axios-config/AxiosConfig";
import { v4 as uuidv4 } from 'uuid';

export interface IOng{
    id: number;
    name: string;
    description: string;
    nhost_id: string;
    updated_at: string;
    created_at: string;
}

const generateNhostId = ():string => {
  return uuidv4()
}

const getAll = async (): Promise<IOng[] | undefined> => {
  try {
      const { data } = await Api.get<IOng[]>('/ongs');
      return data;
  
    } catch (error) {
        console.log(error);
        return undefined;
    }
  }

const getByNhostId = async (nhost_id: string): Promise<IOng | undefined> => {
    try {
      const {data} = await Api.get<IOng[]>(`/ongs/nhost/${nhost_id}`)
      return data[0]
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

const create = async (nome: string, descricao: string, nhost_id:string): Promise<boolean> => {
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

const updateById = async (id:number, name: string, description: string): Promise<boolean> => {
    try {
        const ongToUpdate = {name, description}
  
        const data = await Api.put<string>(`/ongs/${id}`, ongToUpdate);
  
        if(data.status === 200){
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
  create,
  getAll,
  updateById,
  getByNhostId,
  generateNhostId,
}