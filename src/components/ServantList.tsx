import { FC, useState } from 'react';
import '../styles/main.css'
import { Servant } from '../models/servant';
import ServantCard from './ServantCard';
import { useTranslation } from 'react-i18next';
import FileUpload from './FileUpload';
import Modal from './ServantCreate';

interface ServantListProps {
  servants: Servant[]
}

const ServantList: FC<ServantListProps> = ({ servants }) => {
  const { t } = useTranslation()
  const [state, setState] = useState<string>("initial")
  const openCreateWindow = () => { setState('opened') }
  const closeCreateWindow = () => { setState('initial') }
  console.log(state);
  
  return (
    <div>
      <div className='servantListGrid'>
        {servants.map((servant: Servant, id: number) => (
          <ServantCard key={id} servant={servant}></ServantCard>
        ))}
        <div className='create-card' onClick={openCreateWindow}>
          {t('create')}
        </div>
      </div>
      {state === "opened"? (
        <Modal onClose={closeCreateWindow}></Modal>
        // <div className='popup-effect'></div>
      ):''}
    </div>
  );
};


export default ServantList;