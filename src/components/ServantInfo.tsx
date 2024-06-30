import { FC, useEffect, useState } from 'react';
import '../styles/main.css'
import { Servant } from '../models/servant';
import { getLocalization } from '../Api';
import { useTranslation } from 'react-i18next';

interface ServantInfoProps {
    servant: Servant
}

const ServantInfo: FC<ServantInfoProps> = ({ servant }) => {
    const { t } = useTranslation()
    const [details, setDetails] = useState('')
    useEffect(()=> {
        const loadDetails = async () =>{
            const response = await getLocalization(t('lang'), servant.id)
            console.log(response);
            
            setDetails(response.data)
        }
        loadDetails()
    }, [])
    return (
        <div>
            
            {JSON.stringify(details, null, 2)}
            </div>
    );
};

export default ServantInfo;