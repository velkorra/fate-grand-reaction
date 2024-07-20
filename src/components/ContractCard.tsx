import { FC, useState } from 'react';
import { Contract } from '../schemas';
import { useTranslation } from 'react-i18next';
import { deleteContract } from '../Api';
import DeleteButton from './DeleteButton';
import { capitalize } from '../capitalize';
import EditButtonMaster from './EditButtonMaster';

interface ContractCardProps {
    contract: Contract
    reload: () => void
}

const ContractCard: FC<ContractCardProps> = ({ contract, reload }) => {
    const { t } = useTranslation()
    const [count, setCount] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const deleteThis = async () => {
        await deleteContract(contract.servant_id, contract.master_id)
    }
    return (
        <div>
      <div className='master-card'>
        <div className='master-info'>
          <div className='id'>{"servant_id"}: {contract.servant_id}</div>
          <div className='nickname'>{t("master_id")}: {contract.master_id}</div>
          <div className='display-name'>{capitalize(t('command_spells'))}: {contract.command_spells}</div>
          <div className='display-name'>{t('status')}: {contract.status}</div>
          <div className='display-name'>{t('start_date')}: {contract.start_date}</div>
        </div>
        <div className='servant-control' style={{ width: "35%" }}>
          <EditButtonMaster reload={reload} onClick={openModal} ></EditButtonMaster>
          <DeleteButton deleteThis={deleteThis} reload={reload}></DeleteButton>
        </div>
      </div>
      {/* {isModalOpen && (
        // <MasterEdit onClose={closeModal} reload={reload} current_master={contract}></MasterEdit>
      )} */}
    </div>

    );
};

export default ContractCard;