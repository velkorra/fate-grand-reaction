import { FC, useEffect, useState } from 'react';
import '../styles/main.css'
import { Master } from '../models/master';
import { useTranslation } from 'react-i18next';
import { deleteMaster, getAciveContractsCount } from '../Api';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { capitalize } from '../capitalize';

interface MasterCardProps {
  master: Master
  reload: () => void
}

const MasterCard: FC<MasterCardProps> = ({ master, reload }) => {
  const { t } = useTranslation()
  const [count, setCount] = useState()
  const deleteThis = async () => {
    await deleteMaster(master.id)
  }
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
        <div className='display-name'>{capitalize(t('level'))}: {master.level}</div>
        <div className='display-name'>{t('display_name')}: {master.display_name}</div>
        <div className='display-name'>{t('active_contact')}: {count}</div>
      </div>
      <div className='servant-control' style={{width: "35%"}}>
        <EditButton></EditButton>
        <DeleteButton deleteServant={deleteThis} reload={reload}></DeleteButton>
      </div>
    </div >

  );
};

export default MasterCard;