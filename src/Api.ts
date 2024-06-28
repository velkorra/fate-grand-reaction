import axios from "axios";
import { Servant } from "./models/servant";
import { ServantData } from "./schemas";


export const getServants = async (): Promise<Servant[]> => {
    try {
        const response = await axios.get<ServantData[]>('http://127.0.0.1:8000/servants')

        return response.data.map(s => new Servant(s.id, s.name, s.class_name, s.ascension_level, s.level));;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}



export const bb = () => {
    console.log("i am bb")
}
