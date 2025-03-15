import logoMotoca from '../../assets/images/motoca-red.png';
import headerStyle from './header.module.css';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import Notification from '../notification/Notification';
import { useEffect, useState } from 'react';
import { totalDeNotificacoes } from '../../utils/totalDeNotificacoes';
import { useSelector } from 'react-redux';
import { State } from '../../types/state';

export function Header() {
  const [showNotification, setShowNotification] = useState(false);
  const [totalNotificacoes, setTotalNotificacoes] = useState(0);
  const user = useSelector((state: State) => state.login.isLoggedin.user);

  useEffect(() => {
    async function totalNotificacoes() {
      const total = await totalDeNotificacoes(
        user?.business ? 'business' : 'motoboy',
        user?.id,
      );
      if (total) {
        setTotalNotificacoes(total);
      }
    }
    totalNotificacoes();
  }, [user?.business, user?.id]);

  console.log(!user);
  return (
    <>
      <Notification showNotificaton={showNotification} />
      <div className={headerStyle.headerFixed}>
        <header className={headerStyle.header}>
          <Link
            to={
              user?.id === 0
                ? '/'
                : user?.business
                  ? '/index-business'
                  : '/index-motoboy'
            }
          >
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
            <span className={headerStyle.infoNotification}>
              {totalNotificacoes}
            </span>
          </div>
        </header>
      </div>
    </>
  );
}
