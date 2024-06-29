import { FC } from 'react';
import '../styles/main.css'
import { Servant } from '../models/servant';
import ServantCard from './ServantCard';
import { useTranslation } from 'react-i18next';
import FileUpload from './FileUpload';

interface ServantListProps {
  servants: Servant[]
}

const ServantList: FC<ServantListProps> = ({ servants }) => {
  const {t} = useTranslation()
  return (
    <div className='servantListGrid'>
      {servants.map((servant: Servant, id: number) => (
          <ServantCard key={id} servant={servant}></ServantCard>
      ))}
      <div className='create-card'>
        <FileUpload></FileUpload>
      </div>
    </div>
  );
};


export default ServantList;