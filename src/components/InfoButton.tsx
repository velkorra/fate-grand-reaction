import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaInfo } from 'react-icons/fa';
import "../styles/main.css"
import { capitalize } from '../capitalize';
import { Servant } from '../models/servant';
import ServantInfo from './ServantInfo';

interface InfoButtonProps{
    servant : Servant
}

const InfoButton: FC<InfoButtonProps> = ({servant}) => {
  const {t} = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
    <button className='servant-btn info-button' onClick={openModal}>
      <FaInfo className='servant-icon info-icon' /> {capitalize(t('info'))}
    </button>
    {isModalOpen && (
        <div className='modal-overlay'  onClick={closeModal}>
            <div className='modal limited' onClick={e => e.stopPropagation()}>
                <ServantInfo servant={servant}></ServantInfo>
            </div>
        </div>
    )}
    </div>
  );
};

export default InfoButton;