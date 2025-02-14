import { Link } from 'react-router-dom';
import styles from './menu.module.css';
import { FaHome, FaBoxOpen, FaUser } from 'react-icons/fa';

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
