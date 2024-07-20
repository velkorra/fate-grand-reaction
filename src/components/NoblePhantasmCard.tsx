import { FC, useEffect, useState } from 'react';
import '../styles/main.css';

import { useTranslation } from 'react-i18next';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { deleteNoblePhantasm, getName } from '../Api';
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
  const [name, SetName] = useState('')
  const deleteThis = async () => {
    await deleteNoblePhantasm(noblePhantasm.servant_id);
    reload();
  };
  useEffect(() => {
    const fetchName = async () => {
      const response = await getName(t('lang'), noblePhantasm.servant_id)
      SetName(response)
    }
    fetchName()
  }
    , [])

  return (
    <div>
      <div className='np-card'>
        <div className='np-info'>
          <div className='np-name'>{noblePhantasm.name}    ({noblePhantasm.rank.toUpperCase()})</div>
          <div className='np-type'>{noblePhantasm.activation_type}</div>
          <div className='servant-name'>Принадлежит персонажу {name}</div>
          <div className='np-description'>{t('description')}: {noblePhantasm.description}</div>
        </div>
        <div className='np-control'>
          <EditButton reload={reload} onClick={openModal} />
          <DeleteButton reload={reload} deleteThis={deleteThis} />
        </div>
      </div>
      {isModalOpen && (
        <NoblePhantasmEdit onClose={closeModal} reload={reload} currentNoblePhantasm={noblePhantasm} />
      )}
    </div>
  );
};

export default NoblePhantasmCard;