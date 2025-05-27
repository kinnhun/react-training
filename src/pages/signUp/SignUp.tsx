
import { Link } from 'react-router-dom';
import styles from './SignUp.module.scss';

const SignUp = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign up</h2>

        <form className={styles.form}>
          <div>
            <label htmlFor="email" className={styles.label}>Your email</label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              className={styles.input}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={styles.input}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={styles.label}>Rewrite Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button}>Sign up</button>

          <p className={styles.footer}>
            You have an account yet? <Link to="../sign-in" className={styles.link}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
