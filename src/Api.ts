import axios, { AxiosPromise } from "axios";
import { Servant } from "./models/servant";
import { ServantData } from "./schemas";
import { Master } from "./models/master";
const BASE_URL = 'http://127.0.0.1:8000/'

export const getServants = async (): Promise<Servant[]> => {
    try {
        const response = await axios.get<ServantData[]>(BASE_URL + 'servants')

        return response.data.map(s => new Servant(s.id, s.name, s.class_name, s.ascension_level, s.level));;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}

export const deleteServant = async (servant_id: number): Promise<string> => {
    try {
        const response = await axios.delete(BASE_URL + `servants/${servant_id}`)
        return response.data
    } catch (error) {
        return "Servant not found"
    }
}
export const createServant = async (formData: FormData): Promise<any> => {
    const response = await axios.post(BASE_URL + 'servants_new', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response
}
export const addLocalization = async (formData: FormData, language: string, servant_id: number): Promise<any> => {
    const response = await axios.post(BASE_URL + 'localization', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: {
            "language": language,
            "servant_id": servant_id
        }
    })
    return response
}
export const getLocalization = async (language: string, servant_id: number): Promise<any> => {
    const response = await axios.get(BASE_URL + `localization/${servant_id}`, {
        params: {
            "language": language
        }
    })
    return response
}
export const getName = async (language : string, servant_id : number): Promise<string> =>{
    const response = await axios.get(BASE_URL + `name/${servant_id}/${language}`)
    return response.data.name
}

export const getMasters = async () : Promise<Master[]> =>{
    const response = await axios.get(BASE_URL + 'masters')
    return response.data
}

export const getAciveContractsCount = async (master_id : number) :Promise<any>=>{
    const response = await axios.get(BASE_URL + `masters/${master_id}/active_count`)
    return response.data["count"]
} 