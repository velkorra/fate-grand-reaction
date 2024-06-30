import { FC, useEffect, useState } from 'react'
import { Servant } from '../models/servant'
import '../styles/main.css'

import { useTranslation } from 'react-i18next'
import EditButton from './EditButton'
import axios, { isAxiosError } from 'axios'
import DeleteButton from './DeleteButton'
import { deleteServant, getName } from '../Api'
import InfoButton from './InfoButton'
interface ServantCardProps {
  reload: () => void
  servant: Servant
}

const ServantCard: FC<ServantCardProps> = ({ servant, reload }) => {
  const { t } = useTranslation()
  const [imageUrl, setImageUrl] = useState<string>('');
  const [trueName, setTrueName] = useState<string>("none")
  
  useEffect(() => {
    setTrueName(servant.name)
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_image/', {
          params: {
            "servant_id": servant.id,
            "grade": servant.ascensionLevel
          },
          responseType: 'blob',
        });
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            setImageUrl(require(`../servant_cards/${servant.className}.PNG`))
          }
        }
        console.error('Error fetching image:', error);
      }
      const name = await getName(t('lang'), servant.id)
      setTrueName(name)
      

      
    };

    fetchImage();
  }, []);
  const handleDelete = async (servant_id: number) => {
    await deleteServant(servant_id)
  }
  return (

    <div className='servant-card'>

      <div className='servant-image-container'>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${servant.name}`}
            className='servant-image'
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='servant-details'>
        <h3 className='servant-name'>{trueName || servant.name}</h3>
        <p className='servant-class'>{t('class')}: {t(`servant.${servant.className}`)}</p>
        <p className='servant-ascension'>{t('asc_level')}: {servant.ascensionLevel}</p>
        <p className='servant-level'>{t('level')}: {servant.level}</p>
        <div className='servant-control'>
          <EditButton></EditButton>
          <DeleteButton deleteServant={() => handleDelete(servant.id)} reload={reload}></DeleteButton>
        </div>
        <InfoButton servant={servant}></InfoButton>
      </div>
    </div>
  );
};

export default ServantCard