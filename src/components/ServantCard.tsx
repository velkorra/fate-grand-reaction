import { FC } from 'react'
import { Servant } from '../models/servant'
import '../styles/main.css'
interface ServantCardProps {
  servant : Servant
}

const ServantCard: FC<ServantCardProps> = ({ servant }) => {
  return (
    <div className='servant-card'>
      <div className='servant-image-container'>
        <img
          src={require("../S309_Stage1.webp")}
          alt={`${servant.name}`}
          className='servant-image'
        />
      </div>
      <div className='servant-details'>
        <h3 className='servant-name'>{servant.name}</h3>
        <p className='servant-class'>Class: {servant.className}</p>
        <p className='servant-ascension'>Ascension Level: {servant.ascensionLevel}</p>
        <p className='servant-level'>Level: {servant.level}</p>
      </div>
    </div>
  );
};

export default ServantCard