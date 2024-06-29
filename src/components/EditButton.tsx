import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';
import "../styles/main.css"
import { capitalize } from '../capitalize';

const EditButton: FC = () => {
  const {t} = useTranslation()
  return (
    <button className='delete-button'>
      <FaEdit className='delete-icon' /> {capitalize(t('delete'))}
    </button>
  );
};

export default EditButton;