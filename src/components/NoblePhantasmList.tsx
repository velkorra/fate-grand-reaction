import { FC, useEffect, useState } from 'react';
import '../styles/main.css';

import NoblePhantasmCard from './NoblePhantasmCard';
import { useTranslation } from 'react-i18next';
import { getNoblePhantasms, getServants } from '../Api';

import { NoblePhantasm } from '../models/NoblePhantasm';
import NoblePhantasmCreate from './NoblePhantasmCreate';
import { Servant } from '../models/servant';

interface NoblePhantasmListProps {
    reload: () => void;
}

const NoblePhantasmList: FC<NoblePhantasmListProps> = ({ reload }) => {
    const { t } = useTranslation();
    const [servants, setServants] = useState<Servant[]>([])
    const [state, setState] = useState<string>("initial");
    const [noblePhantasms, setNoblePhantasms] = useState<NoblePhantasm[]>([]);

    const openCreateWindow = () => setState('opened');
    const closeCreateWindow = () => setState('initial');

    useEffect(() => {
        const getData = async () => {
            const response = await getNoblePhantasms();
            setNoblePhantasms(response.data);
            const servs = await getServants()
            setServants(servs)
        };
        getData();
    }, []);

    return (
        <div>
            <div className='servant-list'>
                <div className='create-card' onClick={openCreateWindow}>
                    {t('create_noble_phantasm')}
                </div>
                {noblePhantasms.map((noblePhantasm: NoblePhantasm) => (
                    <NoblePhantasmCard key={noblePhantasm.servant_id} noblePhantasm={noblePhantasm} reload={reload} />
                ))}
            </div>
            {state === "opened" && (
                <NoblePhantasmCreate servants={servants} reload={reload} onClose={closeCreateWindow} />
            )}
        </div>
    );
};

export default NoblePhantasmList;