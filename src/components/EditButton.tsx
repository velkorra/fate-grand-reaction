import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';
import "../styles/main.css"

const EditButton: FC = () => {
  const {t} = useTranslation()
  return (
    <button className='edit-button'>
      <FaEdit className='edit-icon' /> {t('edit')}
    </button>
  );
};

export default EditButton;