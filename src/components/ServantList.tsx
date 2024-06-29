import { FC } from 'react';
import '../styles/main.css'
import { Servant } from '../models/servant';
import ServantCard from './ServantCard';

interface ServantListProps {
  servants: Servant[]
}

const ServantList: FC<ServantListProps> = ({ servants }) => {
  return (
    <div className='servantListGrid'>
      {servants.map((servant: Servant, id: number) => (
          <ServantCard key={id} servant={servant}></ServantCard>
      ))}
    </div>
  );
};


export default ServantList;