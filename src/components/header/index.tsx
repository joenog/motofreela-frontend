import logoMotoca from '../../assets/images/motoca-red.png';
import headerStyle from './header.module.css';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import Notification from '../notification/notification';
import { useState } from 'react';

export function Header() {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <>
      <Notification showNotificaton={showNotification} />
      <div className={headerStyle.headerFixed}>
        <header className={headerStyle.header}>
          <Link to={'/'}>
            <img
              className={headerStyle.logoMotoca}
              src={logoMotoca}
              alt="Logo Motoca"
            />
          </Link>
          <div className={headerStyle.iconsMenu}>
            <FaBell
              size={24}
              onClick={() => setShowNotification(!showNotification)}
            />
          </div>
        </header>
      </div>
    </>
  );
}
