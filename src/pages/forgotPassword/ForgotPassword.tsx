import styles from './ForgotPassword.module.scss';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h2 className={styles.title}>Reset password</h2>

        <form className={styles.form}>
          <div>
            <label className={styles.label} htmlFor="email">
              Your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Reset my password
          </button>

          <p className={styles.footer}>
            You have an account yet?{' '}
            <Link to="../sign-in" className={styles.link}>
              Sign in
            </Link>

          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
