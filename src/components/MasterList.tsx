import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Master } from '../models/master';
import MasterCard from './MasterCard';
import { getMasters } from '../Api';
import MasterCreate from './MasterCreate';


interface MasterListProps {
  reload: () => void
}

const MasterList: FC<MasterListProps> = ({reload }) => {
  const { t } = useTranslation()
  
  const [state, setState] = useState<string>("initial")
  const [masters, setMasters] = useState<Master[]>([])
  const openCreateWindow = () => { setState('opened') }
  const closeCreateWindow = () => { setState('initial') }
  useEffect(() =>{
    const getData = async () =>{
      const response = await getMasters()
      setMasters(response)
    }
    getData()
    
  }, [])
  return (
    <div>
      
      <div className='master-list'>
        <div className='create-card' onClick={openCreateWindow}>
          {t('create_master')}
        </div>
        {masters.map((master: Master) => (
          <MasterCard key={master.id} master={master} reload={reload}></MasterCard>
        ))}
      </div>
      {state === "opened"? (
        <MasterCreate reload={reload} onClose={closeCreateWindow}></MasterCreate>
        // <div className='popup-effect'></div>
      ):''}
    </div>
  );
};


export default MasterList;