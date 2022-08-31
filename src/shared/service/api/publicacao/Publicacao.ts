import { Api } from "../../axios-config/AxiosConfig"
import { IOng } from "../ong/Ong";

export interface IPublicacao{
  id:number;
  ong_id:number;
  title:string;
  description:string;
  active:number;
  created_at:string;
  updated_at:string;
  ong: IOng;
}

const getAll = async (): Promise<IPublicacao[] | undefined> => {
  try {
      const { data } = await Api.get<IPublicacao[]>('/publicacoes');
      return data;
  
    } catch (error) {
        console.log(error);
        return undefined;
    }
  }

const getByOngId = async (id: number): Promise<IPublicacao[] | undefined> => {
    try {
      const {data} = await Api.get<IPublicacao[]>(`/ongs/${id}/publicacoes`)
      return data
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

export const publicacaoService = {
  getAll,
  getByOngId
}