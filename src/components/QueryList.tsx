import { FC, useEffect, useState } from 'react';
import '../styles/main.css'
import { getServants } from '../Api';
import JsonTable from './JsonTable';

interface QueryListProps {
}

const QueryList: FC<QueryListProps> = (props) => {
    const [isInQuery, setIsInQuery] = useState(false)
    const [servants, setServants] = useState<any>([])
    useEffect(() => {
        const fetch = async () => {
            const response = await getServants()
            setServants(response)
        }
        fetch()
    }, [])
    if (!isInQuery)
        return (
            <div className='query-list'>
                <div className='query-item' >
                    <a className='query-link lora' onClick={() => setIsInQuery(true)}>Все слуги</a>
                    <h1>Получить средний, максимальный уровень слуг каждого класса</h1>
                    <a className='query-link lora' onClick={() => setIsInQuery(true)}>adsadsadasdasd</a>
                    <h1>Получить средний, максимальный уровень слуг каждого класса</h1>
                </div>
            </div>
        );
    return (
        <JsonTable data={servants}></JsonTable>
    )
};

export default QueryList;