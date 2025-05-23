import styles from './Lesson.module.scss';
import { Link } from 'react-router-dom';

export const Lesson = () => {
  const lessons = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      {lessons.map(num => (
        <Link key={num} to={`/lesson/${num}`} className={styles.lessonBox}>
          Lesson {num}
        </Link>
      ))}
    </div>
  );
};
