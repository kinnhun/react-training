 
import styles from './Welcome.module.scss';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Welcome</h1>
      <Link to="/lesson" className={`${styles.link} ${styles.hoverEffect}`}>
            <p>👉 Go to lesson list</p>
      </Link>
    </div>
  );
};
