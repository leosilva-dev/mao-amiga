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

const create = async (ongId:number, title:string, description:string): Promise<boolean> => {
  try {
    const data = await Api.post(`/publicacoes?ong_id=${ongId}&description=${description}&title=${title}&active=1`)
    if(data.status === 201){
      return true
    }else{
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

const deleteById = async (publicacaoId:number): Promise<boolean> => {
  try {
    const data = await Api.delete(`/publicacoes/${publicacaoId}`)
    if(data.status === 202){
      return true
    }else{
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

export const publicacaoService = {
  getAll,
  create,
  getByOngId,
  deleteById
}