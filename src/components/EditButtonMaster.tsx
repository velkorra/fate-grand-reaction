import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';
import { capitalize } from '../capitalize';

interface EditButtonMasterProps{
  reload: () => void
  onClick : () => void
}

const EditButtonMaster: FC<EditButtonMasterProps> = ({reload, onClick}) => {
  const {t} = useTranslation()
  return (
    <button className='servant-btn edit-button' onClick={onClick}>
      <FaEdit className='servant-icon edit-icon' /> {capitalize(t('edit'))}
    </button>
  );
};

export default EditButtonMaster;