import { Outlet, useNavigate } from 'react-router-dom';
import styles from './LessonLayout.module.scss';
import LessonSidebar from './siderbar/LessonSidebar';
import { Link } from 'react-router-dom';

export const LessonLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>

        <Link to="/lesson" className={styles.logo}>
        <span >All lesson</span>
        </Link>
        
        <h1>Bài thực hành react ( ts required )</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className={styles.body}>
        <LessonSidebar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
