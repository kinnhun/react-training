
import styles from './SignIn.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import type { AppDispatch } from '../../store/store';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const SignIn = () => {


  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const emailInput = form.email.value;

    dispatch(login({ email: emailInput }));
    localStorage.setItem('isAuthenticated', 'true');

    // chuyển hướng đến trang welcome
    window.location.href = 'welcome';
    toast.success('Login thành công!');
  };




  return (
    <div className={styles.wrapper}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Sign in to your account</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Your email</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              className={styles.input}
              required
            />
          </div>

          <div>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.remember}>
              <input type="checkbox" />
              Remember me
            </label>

            <Link to="../forgot-password" className={styles.link}>
              Forgot password?
            </Link>

          </div>

          <button type="submit" className={styles.button}>
            Sign in
          </button>

          <p className={styles.footerText}>
            Don’t have an account yet?{' '}
            <Link to="../sign-up" className={styles.link}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
