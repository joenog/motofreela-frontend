import logoMotoca from '../../assets/images/motoca-red.png';
import headerStyle from './header.module.css';
import profileImage from '../../assets/images/user-profile.jpg';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

export function Header() {
  return (
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
          <Link to={'/kk'}>
            <img
              className={headerStyle.profileImage}
              src={profileImage}
              alt="Profile"
            />
          </Link>
          <div className={headerStyle.profileContainer}>
            <Link to={'/notificacoes'} className={headerStyle.notificationIcon}>
              <FaBell size={24} />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
