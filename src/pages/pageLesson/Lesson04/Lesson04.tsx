import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import styles from './Lesson04.module.scss';
import {
  validateUsername,
  validatePassword,
  validatePhone,
  validateWebsite,
  validateLinkedIn,
  validateFacebook,
  validateConfirmPassword,
  requiredEmail,
  requiredDob,
  requiredFirstName,
  requiredLastName,
  requiredActiveRange
} from './validations';

const FormComponent = ({ mode }: { mode: 'onBlur' | 'onSubmit' }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode,
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log(`Submit (${mode})`, data);
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.formTitle}>Thực hành validate form - {mode}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
        <div>
          <label>Username</label>
          <input {...register('username', { validate: validateUsername })} className={`${styles.input} ${errors.username ? styles.errorInput : ''}`} />
          {typeof errors.username?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.username?.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register('password', { validate: validatePassword })} className={`${styles.input} ${errors.password ? styles.errorInput : ''}`} />
          {typeof errors.password?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.password?.message}</p>
          )}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              validate: (value) => validateConfirmPassword(value, watch('password')),
            })}
            className={`${styles.input} ${errors.confirmPassword ? styles.errorInput : ''}`}
          />
          {typeof errors.confirmPassword?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.confirmPassword?.message}</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register('email', { required: requiredEmail })} className={`${styles.input} ${errors.email ? styles.errorInput : ''}`} />
          {typeof errors.email?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.email?.message}</p>
          )}
        </div>

        <div>
          <label>Phone</label>
          <input {...register('phone', { validate: validatePhone })} className={`${styles.input} ${errors.phone ? styles.errorInput : ''}`} />
          {typeof errors.phone?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.phone?.message}</p>
          )}
        </div>

        <div>
          <label>Website</label>
          <input {...register('website', { validate: validateWebsite })} className={`${styles.input} ${errors.website ? styles.errorInput : ''}`} />
          {typeof errors.website?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.website?.message}</p>
          )}
        </div>

        <div>
          <label>Date of Birth</label>
          <Controller
            name="dob"
            control={control}
            rules={{ required: requiredDob }}
            render={({ field }) => (
              <DatePicker
                {...field}
                format="DD-MM-YYYY"
                className={`${styles.input} ${errors.dob ? styles.errorInput : ''}`}
                disabledDate={(date) => {
                  const year = dayjs(date).year();
                  return year < 1980 || year > 2020;
                }}
              />
            )}
          />
          {typeof errors.dob?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.dob?.message}</p>
          )}
        </div>

        <div>
          <label>First Name</label>
          <input {...register('firstName', { required: requiredFirstName })} className={`${styles.input} ${errors.firstName ? styles.errorInput : ''}`} />
          {typeof errors.firstName?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.firstName?.message}</p>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input {...register('lastName', { required: requiredLastName })} className={`${styles.input} ${errors.lastName ? styles.errorInput : ''}`} />
          {typeof errors.lastName?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.lastName?.message}</p>
          )}
        </div>

        <div>
          <label>LinkedIn</label>
          <input {...register('linkedin', { validate: validateLinkedIn })} className={`${styles.input} ${errors.linkedin ? styles.errorInput : ''}`} />
          {typeof errors.linkedin?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.linkedin?.message}</p>
          )}
        </div>

        <div>
          <label>Facebook</label>
          <input {...register('facebook', { validate: validateFacebook })} className={`${styles.input} ${errors.facebook ? styles.errorInput : ''}`} />
          {typeof errors.facebook?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.facebook?.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label>Active Range</label>
          <Controller
            name="activeRange"
            control={control}
            rules={{ required: requiredActiveRange }}
            render={({ field }) => (
              <DatePicker.RangePicker
                {...field}
                className={`${styles.input} ${errors.activeRange ? styles.errorInput : ''}`}
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            )}
          />
          {typeof errors.activeRange?.message === 'string' && (
            <p className={styles.errorMessage}>{errors.activeRange?.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            disabled={mode === 'onBlur' && !isValid}
            className={styles.submitButton}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export const Lesson04 = () => {
  return (
    <div className={styles.verticalStack}>
      <div className={styles.blockWrapper}>
        <FormComponent mode="onBlur" />
      </div>
      <div className={styles.blockWrapper}>
        <FormComponent mode="onSubmit" />
      </div>
    </div>
  );
};