'use client';

import toast, { Toaster } from 'react-hot-toast';
import css from './SignUpPage.module.css';
import * as Yup from 'yup';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email must look like name@example.com')
      .required('Enter your email')
      .trim(),
    password: Yup.string()
      .min(6, 'The password must be at least 6 characters long.')
      .required('Password is required')
      .trim(),
  });

  const handleSubmit = async (formData: FormData) => {
    const password = formData.get('password');
    const email = formData.get('email');

    if (typeof password !== 'string' || typeof email !== 'string') {
      return;
    }

    const newUser = {
      password: password.trim(),
      email: email.trim(),
    };

    try {
      await validationSchema.validate(newUser, { abortEarly: false });
      const userData = await register(newUser);

      setUser(userData);

      router.push('/profile');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.errors[0], { duration: 7000 });
      } else {
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <Toaster position='top-right' />
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' name='email' className={css.input} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            className={css.input}
          />
        </div>

        <div className={css.actions}>
          <button type='submit' className={css.submitButton}>
            Register
          </button>
        </div>

        {/* <p className={css.error}>Error</p> */}
      </form>
    </main>
  );
}
