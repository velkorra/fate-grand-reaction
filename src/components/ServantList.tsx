import { FC, useEffect, useState } from 'react';
import '../styles/main.css'
import ServantCard from './ServantCard';
import { useTranslation } from 'react-i18next';
import ServantCreate from './ServantCreate';
import { ServantWhithLocalization } from '../schemas';
import { getServantsWhithLocalization } from '../Api';


interface ServantListProps {
  reload: () => void
}

const ServantList: FC<ServantListProps> = ({ reload }) => {
  const [servantData, setServantData] = useState<ServantWhithLocalization[]>([]);
  const { t } = useTranslation()
  const [state, setState] = useState<string>("initial")
  const openCreateWindow = () => { setState('opened') }
  const closeCreateWindow = () => { setState('initial') }

  useEffect(() => {
    const fetch = async () => {
      const data = await getServantsWhithLocalization()
      setServantData(data)
    }
    fetch()
  }, [])

  return (
    <div>
      <div className='servantListGrid'>
        <div className='create-card' onClick={openCreateWindow}>
          {t('create')}
        </div>
        {servantData.map((servant: ServantWhithLocalization, id: number) => (
          <ServantCard key={id} servant={servant} reload={reload}></ServantCard>
        ))}
      </div>
      {state === "opened" ? (
        <ServantCreate reload={reload} onClose={closeCreateWindow}></ServantCreate>
        // <div className='popup-effect'></div>
      ) : ''}
    </div>
  );
};


export default ServantList;