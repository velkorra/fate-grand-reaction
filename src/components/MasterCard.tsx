import { FC, useEffect, useState } from 'react';
import '../styles/main.css'
import { Master } from '../models/master';
import { useTranslation } from 'react-i18next';
import { getAciveContractsCount } from '../Api';

interface MasterCardProps {
  master: Master
  reload: () => void
}

const MasterCard: FC<MasterCardProps> = ({ master, reload }) => {
  const { t } = useTranslation()
  const [count, setCount] = useState()
  useEffect(() =>{
    const fetch = async () =>{
      const response = await getAciveContractsCount(master.id)
      setCount(response)
    }
    fetch()
  })
  return (
    <div className='master-card'>
      <div className='master-info'>
        <div className='id'>{"id"}: {master.id}</div>
        <div className='nickname'>{t("nickname")}: {master.nickname}</div>
        <div className='display-name'>{t('display_name')}: {master.display_name}</div>
        <div className='display-name'>{t('active_contact')}: {count}</div>
      </div>
    </div >

  );
};

export default MasterCard;