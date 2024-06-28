import { FC } from 'react'
import { Servant } from '../models/servant'
import '../styles/main.css'
import '../i18n'
import { useTranslation } from 'react-i18next'
interface ServantCardProps {
  servant : Servant
}

const ServantCard: FC<ServantCardProps> = ({ servant }) => {
  const {t} = useTranslation()
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
        <p className='servant-class'>{t('class')}: {t(`servant.${servant.className}`)}</p>
        <p className='servant-ascension'>{t('asc_level')}: {servant.ascensionLevel}</p>
        <p className='servant-level'>{t('level')}: {servant.level}</p>
      </div>
    </div>
  );
};

export default ServantCard