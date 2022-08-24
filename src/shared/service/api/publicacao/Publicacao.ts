import { Api } from "../../axios-config/AxiosConfig"

export interface IPublicacao{
  id:number;
  ong_id:number;
  title:string;
  description:string;
  active:number;
  created_at:string;
  updated_at:string;
}

const getPublicacoesByOngId = async (id: number): Promise<IPublicacao[] | undefined> => {
    try {
      const {data} = await Api.get<IPublicacao[]>(`/ongs/${id}/publicacoes`)
      return data
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

export const publicacaoService = {
    getPublicacoesByOngId
}