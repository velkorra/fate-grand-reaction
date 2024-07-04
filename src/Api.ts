import axios from "axios";
import { Servant } from "./models/servant";
import { Contract, ServantData } from "./schemas";
import { Master } from "./models/master";
import { NoblePhantasm } from "./models/NoblePhantasm";
// const BASE_URL = 'https://1pqzvstl-8000.euw.devtunnels.ms/'
// const BASE_URL = 'http://127.0.0.1:8000/'
const BASE_URL = 'http://127.0.0.1:80/'
// const BASE_URL = 'https://d0jzr844-8000.euw.devtunnels.ms/'

export const getServants = async (): Promise<Servant[]> => {
    try {
        const response = await axios.get<ServantData[]>(BASE_URL + 'servants')

        return response.data.map(s => new Servant(s.id, s.name, s.class_name, s.ascension_level, s.level, s.alignment, s.gender, s.state));;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}
export const getServantImage = async(servant_id : number, grade : number) : Promise<any> => {
    const response = await axios.get(BASE_URL + 'get_image/', {
    params: {
      "servant_id": servant_id,
      "grade": grade
    },
    responseType: 'blob',
  });
  return response.data
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
export const getName = async (language: string, servant_id: number): Promise<string> => {
    const response = await axios.get(BASE_URL + `name/${servant_id}/${language}`)
    return response.data.name
}

export const getMasters = async (): Promise<Master[]> => {
    const response = await axios.get(BASE_URL + 'masters')
    return response.data
}

export const getAciveContractsCount = async (master_id: number): Promise<any> => {
    const response = await axios.get(BASE_URL + `masters/${master_id}/active_count`)
    return response.data["count"]
}

export const deleteMaster = async (master_id: number): Promise<string> => {
    try {
        const response = await axios.delete(BASE_URL + `masters/${master_id}`)
        return response.data
    } catch (error) {
        return "Servant not found"
    }
}
export const deleteContract = async (servant_id: number, master_id: number): Promise<string> => {
    try {
        const response = await axios.delete(BASE_URL + 'contracts', {
            params: {
                "servant_id": servant_id,
                "master_id": master_id
            }
        })
        return response.data
    } catch (error) {
        return "Servant not found"
    }
}

export const createMaster = async (formData: FormData): Promise<any> => {
    try {
        const response = await axios.post(BASE_URL + 'masters', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    }
    catch (error) {
        alert(error)
    }
}
export const editMaster = async (formData: FormData, master_id: number): Promise<any> => {
    try {
        const response = await axios.put(BASE_URL + `masters/${master_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    }
    catch (error) {
        alert(error)
    }
}
export const updateLocalization = async (formData: FormData, language: string, servant_id: number): Promise<any> => {
    const response = await axios.put(BASE_URL + 'localization', formData, {
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

export const updateServant = async (formData: FormData, servant_id: number): Promise<any> => {
    const response = await axios.put(BASE_URL + `servants/${servant_id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response
}
export const addPicture = async (formData: FormData, servant_id: number): Promise<any> => {
    const response = await axios.post(BASE_URL + `add_image/${servant_id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response
}

export const getContracts = async (): Promise<Contract[]> => {
    const response = await axios.get(BASE_URL + 'contracts/all')
    return response.data
}
export const createContract = async (servant_id: number, master_id: number): Promise<any> => {
    try {
        const response = await axios.post(BASE_URL + 'contracts', {
            "servant_id": servant_id,
            "master_id": master_id
        }
        )
        return response
    }
    catch (error) {
        alert(error)
    }
}

export const getNoblePhantasms = async (): Promise<any> => {
    try {
        const response = await axios.get(BASE_URL + 'np/all')
        return response
    }
    catch (error) {
        alert(error)
    }
}
export const updateNoblePhantasm = async (noble_phantasm: NoblePhantasm): Promise<any> => {
    try {
        const response = await axios.put(BASE_URL + 'np', noble_phantasm)
        return response
    }
    catch (error) {
        alert(error)
    }
}
export const createNoblePhantasm = async (noble_phantasm: NoblePhantasm): Promise<any> => {
    try {
        const response = await axios.post(BASE_URL + 'np', noble_phantasm)
        return response
    }
    catch (error) {
        alert(error)
    }
}
export const deleteNoblePhantasm = async (servant_id: number): Promise<any> => {
    try {
        const response = await axios.post(BASE_URL + 'contracts'
        )
        return response
    }
    catch (error) {
        alert(error)
    }
}

export const getSkills = async (): Promise<any> => {
    try {
        const response = await axios.get(BASE_URL + 'skills')
        return response
    }
    catch (error) {
        alert(error)
    }
}
export const createSkill = async (skill: Skill): Promise<any> => {
    try {
        const response = await axios.post(BASE_URL + 'skills', skill)
        return response
    }
    catch (error) {
        alert(error)
    }
}
export const deleteSkill = async (id : number): Promise<any> => {
    try {
        const response = await axios.delete(BASE_URL + `skills/${id}`, )
        return response
    }
    catch (error) {
        alert(error)
    }
}
export const UpdateSkill = async (skill: Skill): Promise<any> => {
    try {
        const response = await axios.put(BASE_URL + 'skills', skill)
        return response
    }
    catch (error) {
        alert(error)
    }
}
export const addSkillPicture = async (formData: FormData, id: number): Promise<any> => {
    const response = await axios.post(BASE_URL + `add_skill_picture/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
    return response
}
export const getSkillPicture = async (id: number): Promise<any> => {
    const response = await axios.get(BASE_URL + `skill_picture/${id}`, {
        responseType: "blob"
    })
    return response
}
export const getLevelAnalys = async (): Promise<any> => {
    const response = await axios.get(BASE_URL + `level_analys`)
    return response
}
export const getLocalizations = async (): Promise<any> => {
    const response = await axios.get(BASE_URL + `all_localization`)
    return response
}
export const getSummonedServants = async (): Promise<any> => {
    const response = await axios.get(BASE_URL + `summoned_servants`)
    return response
}
export const getFemales = async (): Promise<any> => {
    const response = await axios.get(BASE_URL + `female_servants_descriptions`)
    return response
}
export const getTopServants = async (): Promise<any> => {
    const response = await axios.get(BASE_URL + `top_servants`)
    return response
}
