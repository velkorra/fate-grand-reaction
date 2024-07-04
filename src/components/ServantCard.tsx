import { FC, useEffect, useState } from 'react'
import { Servant } from '../models/servant'
import '../styles/main.css'

import { useTranslation } from 'react-i18next'
import EditButton from './EditButton'
import axios, { isAxiosError } from 'axios'
import DeleteButton from './DeleteButton'
import { deleteServant, getLocalization, getName, getServantImage } from '../Api'
import InfoButton from './InfoButton'
import ServantEdit from './ServantEdit'
interface ServantCardProps {
  reload: () => void
  servant: Servant
}
interface servantLocalization {
  name: string;
  description: string;
  history: string;
  prototype_person: string;
  illustrator: string;
  voice_actor: string;
  temper: string;
  intro: string;
}
const ServantCard: FC<ServantCardProps> = ({ servant, reload }) => {

  const { t } = useTranslation()
  const [ruLoc, setRuLoc] = useState<servantLocalization>()
  const [enLoc, setEnLoc] = useState<servantLocalization>()
  const [imageUrl, setImageUrl] = useState<string>('');
  const [trueName, setTrueName] = useState<string>("none")
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    setTrueName(servant.name)
    const fetchImage = async () => {
      try {
      const data = await getServantImage(servant.id, servant.ascensionLevel)
        setImageUrl(URL.createObjectURL(data));
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
      const ru = await getLocalization('ru', servant.id)
      const en = await getLocalization('en', servant.id)
      setRuLoc(ru.data)
      setEnLoc(en.data)


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
        <p className='servant-level'>{t('alignment')}: {servant.alignment ? t(`alignments.${servant.alignment}`) : ''}</p>
        <p className='servant-level'>{t('status')}: {t(servant.state)}</p>
        <div className='servant-control'>
          <EditButton reload={reload} onClick={openModal}></EditButton>
          <DeleteButton deleteServant={() => handleDelete(servant.id)} reload={reload}></DeleteButton>
        </div>
        <InfoButton servant={servant}></InfoButton>
      </div>
      {isModalOpen && (
        <ServantEdit onClose={closeModal} reload={reload} currentServant={servant} ruLoc={ruLoc} enLoc={enLoc}></ServantEdit>
      )}
    </div>
  );
};

export default ServantCard