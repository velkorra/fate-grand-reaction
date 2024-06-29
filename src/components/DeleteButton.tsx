import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import "../styles/main.css"
import { capitalize } from '../capitalize';

const DeleteButton: FC = () => {
  const {t} = useTranslation()
  return (
    <button className='edit-button'>
      <FaTrash className='edit-icon' /> {capitalize(t('delete'))}
    </button>
  );
};

export default DeleteButton;