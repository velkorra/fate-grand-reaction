import { FC, useState } from 'react';
import '../styles/main.css'
import { Servant } from '../models/servant';
import ServantCard from './ServantCard';
import { useTranslation } from 'react-i18next';

import Modal from './ServantCreate';

interface ServantListProps {
  reload: () => void
  servants: Servant[]
}

const ServantList: FC<ServantListProps> = ({ servants, reload }) => {
  const { t } = useTranslation()
  const [state, setState] = useState<string>("initial")
  const openCreateWindow = () => { setState('opened') }
  const closeCreateWindow = () => { setState('initial') }

  return (
    <div>
      <div className='servantListGrid'>
        <div className='create-card' onClick={openCreateWindow}>
          {t('create')}
        </div>
        {servants.map((servant: Servant, id: number) => (
          <ServantCard key={id} servant={servant} reload={reload}></ServantCard>
        ))}
      </div>
      {state === "opened"? (
        <Modal reload={reload} onClose={closeCreateWindow}></Modal>
        // <div className='popup-effect'></div>
      ):''}
    </div>
  );
};


export default ServantList;