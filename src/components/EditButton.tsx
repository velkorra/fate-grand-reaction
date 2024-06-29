import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';


const EditButton: FC = () => {
  const {t} = useTranslation()
  return (
    <button style={buttonStyle}>
      <FaEdit style={iconStyle} /> {t('edit')}
    </button>
  );
};


const buttonStyle: React.CSSProperties = {
  background: 'rgba(100, 149, 237, 0.8)',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};


const iconStyle: React.CSSProperties = {
  marginRight: '5px'
};

export default EditButton;