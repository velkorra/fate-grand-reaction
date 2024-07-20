import { FC, useEffect, useState } from 'react';
import { getContracts, getFemales, getLevelAnalys, getLocalizations, getMasters, getServants, getSkills, getSummonedServants, getTopServants } from '../Api';
import JsonTable from './JsonTable';

interface QueryListProps {
}

const QueryList: FC<QueryListProps> = (props) => {
    const [isInQuery, setIsInQuery] = useState(false)
    const [readyToSwitch, setReadyToSwitch] = useState(false)
    const [servants, setServants] = useState<any>([])
    useEffect(() => {
        
    }, [])
    const fetchServants = async () => {
        const response = await getServants()
        setServants(response)
        setReadyToSwitch(true)
    }
    const fetchMasters = async () => {
        const response = await getMasters()
        setServants(response)
        setReadyToSwitch(true)
    }
    const fetchContracts = async () => {
        const response = await getContracts()
        setServants(response)
        setReadyToSwitch(true)
    }
    const fetchSkills = async () => {
        const response = await getSkills()
        setServants(response.data)
        setReadyToSwitch(true)
    }
    const fetchLevelAnalys = async () => {
        const response = await getLevelAnalys()
        setServants(response.data)
        setReadyToSwitch(true)}
    const fetchlolalizations = async () => {
        const response = await getLocalizations()
        setServants(response.data)
        setReadyToSwitch(true)}
    const fetchSummoned = async () => {
        const response = await getSummonedServants()
        setServants(response.data)
        setReadyToSwitch(true)}
    const fetchGirls = async () => {
        const response = await getFemales()
        setServants(response.data)
        setReadyToSwitch(true)}
    const fetchTop = async () => {
        const response = await getTopServants()
        setServants(response.data)
        setReadyToSwitch(true)}

    if (!isInQuery)
        return (
            <div className='query-list'>
                <div className='query-item' >
                    <a className='query-link lora' onClick={() => {setIsInQuery(true); fetchServants()}}>Все Слуги</a>
                    <h1>Получим всех слуг</h1>
                    <a className='query-link lora' onClick={() => {setIsInQuery(true); fetchMasters()}}>Все Мастера</a>
                    <h1>Получим всех мастеров</h1>
                    <a className='query-link lora' onClick={() => {setIsInQuery(true); fetchContracts()}}>Все Контракты</a>
                    <h1>Получим все Контракты</h1>
                    <a className='query-link lora' onClick={() => {setIsInQuery(true); fetchSkills()}}>Все Навыки</a>
                    <h1>Получим все навыки</h1>
                    <a className='query-link lora' onClick={() => {setIsInQuery(true); fetchLevelAnalys()}}>Запрос 1</a>
                    <h1>Получить средний, максимальный уровень слуг каждого класса</h1>
                    <a className='query-link lora' onClick={() => {setIsInQuery(true); fetchlolalizations()}}>Запрос 2</a>
                    <h1>Имя + локализованное имя и описание всех слуг</h1>
                    <a className='query-link lora' onClick={() => {setIsInQuery(true); fetchSummoned()}}>Запрос 3</a>
                    <h1>Призванные слуги, никнеймы призывателей и имена слуг на Русском</h1>
                    <a className='query-link lora' onClick={() => {setIsInQuery(true); fetchGirls()}}>Запрос 4</a>
                    <h1>Персонажи женского пола и их описания</h1>
                    <a className='query-link lora' onClick={() => {setIsInQuery(true); fetchTop()}}>Запрос 5</a>
                    <h1>Персонажи женского пола и их описания</h1>
                </div>
            </div>
        );
    else if (readyToSwitch)
        return (
        <JsonTable data={servants}></JsonTable>
    )
};

export default QueryList;