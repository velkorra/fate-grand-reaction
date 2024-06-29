import { FC } from 'react';
import { FaEdit } from 'react-icons/fa';  // Используем иконку редактирования из react-icons


const EditButton: FC = () => {
  return (
    <button style={buttonStyle}>
      <FaEdit style={iconStyle} /> Изменить
    </button>
  );
};

// Стили для кнопки
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

// Стили для иконки
const iconStyle: React.CSSProperties = {
  marginRight: '5px'
};

export default EditButton;