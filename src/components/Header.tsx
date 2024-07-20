import { FC } from 'react';

interface NavbarProps {
}

const Header: FC<NavbarProps> = (props) => {
  return (
    <div>
      <div className='header'>
        <div className="header-title lora">Fate/grand postgression</div>
      </div>
    </div>
  );
};

export default Header;