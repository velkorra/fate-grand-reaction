import { FC } from 'react';
import '../styles/main.css'
import { Master } from '../models/master';
import { useTranslation } from 'react-i18next';

interface MasterCardProps {
  master: Master
  reload: () => void
}

const MasterCard: FC<MasterCardProps> = ({ master, reload }) => {
  const { t } = useTranslation()
  return (
    <div className='master-card'>
      <div className='master-info'>
        <div className='id'>{"id"}: {master.id}</div>
        <div className='nickname'>{t("nickname")}: {master.nickname}</div>
        <div className='display-name'>{t('display_name')}: {master.display_name}</div>
      </div>
    </div >

  );
};

export default MasterCard;