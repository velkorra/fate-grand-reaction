import axios from "axios";
import { Servant } from "./models/servant";
import { ServantData } from "./schemas";
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