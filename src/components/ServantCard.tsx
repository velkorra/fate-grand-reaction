import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import EditButton from './EditButton'
import { isAxiosError } from 'axios'
import DeleteButton from './DeleteButton'
import { deleteServant, getServantImage } from '../Api'
import InfoButton from './InfoButton'
import ServantEdit from './ServantEdit'
import { ServantWhithLocalization } from '../schemas'
interface ServantCardProps {
  reload: () => void
  servant: ServantWhithLocalization
}
const ServantCard: FC<ServantCardProps> = ({ servant, reload }) => {

  const { t } = useTranslation()
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getLocalizedName = () => {
    const localization = servant.localizations.find(loc => loc.language === t("lang"));
    if (localization && localization.name) {
      return localization.name;
    }
    for (const loc of servant.localizations) {
      if (loc.name) {
        return loc.name;
      }
    }
    return servant.name;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
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
        <h3 className='servant-name'>{getLocalizedName()}</h3>
        <p className='servant-class'>{t('class')}: {t(`servant.${servant.className}`)}</p>
        <p className='servant-ascension'>{t('asc_level')}: {servant.ascensionLevel}</p>
        <p className='servant-level'>{t('level')}: {servant.level}</p>
        <p className='servant-level'>{t('alignment')}: {servant.alignment ? t(`alignments.${servant.alignment}`) : ''}</p>
        <p className='servant-level'>{t('status')}: {t(servant.state)}</p>
        <div className='servant-control'>
          <EditButton reload={reload} onClick={openModal}></EditButton>
          <DeleteButton deleteThis={() => handleDelete(servant.id)} reload={reload}></DeleteButton>
        </div>
        <InfoButton servant={servant}></InfoButton>
      </div>
      {isModalOpen && (
        <ServantEdit onClose={closeModal} reload={reload} currentServant={servant}></ServantEdit>
      )}
    </div>
  );
};

export default ServantCard