import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { capitalize } from '../capitalize';
interface DeleteButtonMasterProps {
    reload: () => void
    deleteServant: () => Promise<void>
}

const DeleteButtonMaster: FC<DeleteButtonMasterProps> = ({ deleteServant, reload }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = async () => {
        await deleteServant();
        reload()
        closeModal();
    };

    const { t } = useTranslation()
    return (
        <div>
            <button className='servant-btn delete-button' onClick={openModal}>
                <FaTrash className='servant-icon delete-icon' /> {capitalize(t('delete'))}
            </button>
            {isModalOpen && (
                <div className='modal-overlay' onClick={closeModal}>
                    <div className='modal' onClick={e => e.stopPropagation()}>
                        <h2>{capitalize(t('confirm_delete'))}</h2>
                        <p>{capitalize(t('are_you_sure_delete'))}</p>
                        <div>
                            <button onClick={handleDelete} className="servant-btn edit-button">
                                {capitalize(t('confirm'))}
                            </button>
                            <button onClick={closeModal} className="servant-btn edit-button">
                                {capitalize(t('cancel'))}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteButtonMaster;