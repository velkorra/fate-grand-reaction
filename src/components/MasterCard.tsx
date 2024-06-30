import { FC } from 'react';
import '../styles/main.css'
import { Master } from '../models/master';

interface MasterCardProps {
  master : Master
  reload : () => void
}

const MasterCard: FC<MasterCardProps> = ({master, reload}) => {

  return (
    <div className='master-card'>
      <h1>{master.nickname}</h1>
      <h1>{master.display_name}</h1>
    </div>
  );
};

export default MasterCard;