import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { FaHome, FaNetworkWired, FaUser } from 'react-icons/fa';

export function FloatingMenu() {
  return (
    <>
      <div className={styles.floatingMenu}>
        <div className={styles.menu}>
          <Link className={styles.btnMenu} to={'/'}>
            {' '}
            <FaHome size={30} />{' '}
          </Link>
          <Link className={styles.btnMenu} to={''}>
            {' '}
            <FaNetworkWired size={30} />{' '}
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
