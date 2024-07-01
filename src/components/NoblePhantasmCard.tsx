import { FC, useEffect, useState } from 'react';
import '../styles/main.css';

import { useTranslation } from 'react-i18next';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { deleteNoblePhantasm } from '../Api';
import NoblePhantasmEdit from './NoblePhantasmEdit';
import { NoblePhantasm } from '../models/NoblePhantasm';


interface NoblePhantasmCardProps {
  noblePhantasm: NoblePhantasm;
  reload: () => void;
}

const NoblePhantasmCard: FC<NoblePhantasmCardProps> = ({ noblePhantasm, reload }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const deleteThis = async () => {
    await deleteNoblePhantasm(noblePhantasm.servant_id);
    reload();
  };

  return (
    <div>
      <div className='servant-card'>
        <div className='servant-info'>
          <div className='name'>{t('name')}: {noblePhantasm.name}</div>
          <div className='rank'>{t('rank')}: {noblePhantasm.rank}</div>
          <div className='activation-type'>{t('activation_type')}: {noblePhantasm.activation_type}</div>
          <div className='description'>{t('description')}: {noblePhantasm.description}</div>
        </div>
        <div className='servant-control'>
          <EditButton reload={reload} onClick={openModal} />
          <DeleteButton reload={reload} deleteServant={deleteThis} />
        </div>
      </div>
      {isModalOpen && (
        <NoblePhantasmEdit onClose={closeModal} reload={reload} currentNoblePhantasm={noblePhantasm} />
      )}
    </div>
  );
};

export default NoblePhantasmCard;