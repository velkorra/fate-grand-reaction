import { FC } from 'react';
import '../styles/main.css'

interface NavbarProps {
}

const Header: FC<NavbarProps> = (props) => {
  return (
    <div className='header'>
      <div className="header-title lora">Fate/grand postgression</div>
    </div>
  );
};

export default Header;