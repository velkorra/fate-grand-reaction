import { FC, useEffect, useState } from 'react';
import '../styles/main.css'
import { Master } from '../models/master';
import { useTranslation } from 'react-i18next';
import { deleteMaster, getAciveContractsCount } from '../Api';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { capitalize } from '../capitalize';
import EditButtonMaster from './EditButtonMaster';
import ServantCreate from './ServantCreate';
import MasterEdit from './MasterEdit';

interface MasterCardProps {
  master: Master
  reload: () => void
}

const MasterCard: FC<MasterCardProps> = ({ master, reload }) => {
  const { t } = useTranslation()
  const [count, setCount] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const deleteThis = async () => {
    await deleteMaster(master.id)
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await getAciveContractsCount(master.id)
      setCount(response)
    }
    fetch()
  })
  return (
    <div>
      <div className='master-card'>
        <div className='master-info'>
          <div className='id'>{"id"}: {master.id}</div>
          <div className='nickname'>{t("nickname")}: {master.nickname}</div>
          <div className='display-name'>{capitalize(t('level'))}: {master.level}</div>
          <div className='display-name'>{t('display_name')}: {master.display_name}</div>
          <div className='display-name'>{t('active_contract')}: {count}</div>
        </div>
        <div className='servant-control' style={{ width: "35%" }}>
          <EditButtonMaster reload={reload} onClick={openModal} ></EditButtonMaster>
          <DeleteButton deleteThis={deleteThis} reload={reload}></DeleteButton>
        </div>
      </div>
      {isModalOpen && (
        <MasterEdit onClose={closeModal} reload={reload} current_master={master}></MasterEdit>
      )}
    </div>

  );
};

export default MasterCard;