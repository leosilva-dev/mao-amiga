import { Api } from "../../axios-config/AxiosConfig";

export interface IContato{
    phone_number: string;
    email: string;
    address: string;
}

const getByOngId = async (ongId: number): Promise<IContato | undefined> => {
    try {
      const {data} = await Api.get<IContato[]>(`/ongs/${ongId}/contatos`)
      return data[0]
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

 
export const contatoService = {
    getByOngId
  }