import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';
import "../styles/main.css"
import { capitalize } from '../capitalize';

const EditButton: FC = () => {
  const {t} = useTranslation()
  return (
    <button className='servant-btn edit-button'>
      <FaEdit className='servant-icon edit-icon' /> {capitalize(t('edit'))}
    </button>
  );
};

export default EditButton;