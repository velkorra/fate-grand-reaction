import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ServantWhithLocalization } from '../schemas';

interface ServantInfoProps {
  servant: ServantWhithLocalization
}

const ServantInfo: FC<ServantInfoProps> = ({ servant }) => {
  const { t } = useTranslation()
  const details = servant.localizations.find(loc => loc.language === t("lang"))

  return (
    <div style={{ overflowY: "scroll" }}>

      {details ? (
        <ul>
          {Object.entries(details).map(([key, value]) => (
            <li key={key}>
              <strong>{t(key)}:</strong> {Array.isArray(value) ? value.join(', ') : (value ? value.toString() : '')}
            </li>
          ))}
        </ul>
      ) : ''}
    </div>
  );
};

export default ServantInfo;