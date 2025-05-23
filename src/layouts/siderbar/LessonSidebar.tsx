import React from 'react';
import styles from './LessonSidebar.module.scss';
import { NavLink } from 'react-router-dom';

const lessons = Array.from({ length: 8 }, (_, i) => i + 1);

const LessonSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menu}>
        {lessons.map((lesson) => (
          <li key={lesson}>
            <NavLink
              to={`/lesson/${lesson}`}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              Lesson {lesson}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LessonSidebar;
