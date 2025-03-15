import { Link } from 'react-router-dom';
import styles from './menu.module.css';
import { FaHome, FaBoxOpen, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { State } from '../../types/state';

export function FloatingMenu() {
  const user = useSelector((state: State) => state.login.isLoggedin.user);
  return (
    <>
      <div className={styles.floatingMenu}>
        <div className={styles.menu}>
          <Link
            className={styles.btnMenu}
            to={
              !user
                ? '/'
                : user?.business
                  ? '/index-business'
                  : '/index-motoboy'
            }
          >
            {' '}
            <FaHome size={30} />{' '}
          </Link>
          <Link
            className={styles.btnMenu}
            to={user?.business ? 'relatorios-business' : 'relatorios-motoboy'}
          >
            {' '}
            <FaBoxOpen size={30} />{' '}
          </Link>
          <Link className={styles.btnMenu} to={''}>
            {' '}
            <FaUser size={28} />{' '}
          </Link>
        </div>
      </div>
    </>
  );
}
