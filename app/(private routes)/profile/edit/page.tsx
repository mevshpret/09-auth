'use client';

import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updateMe } from '@/lib/api/clientApi';

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const handleCancel = () => {
    router.push('/profile');
  };

  const handleSave = async (formData: FormData) => {
    const userName = formData.get('username');
    if (typeof userName !== 'string') {
      return;
    }

    const updatedUserData = {
      username: userName.trim(),
    };

    const updatedUser = await updateMe(updatedUserData);

    setUser(updatedUser);

    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || '/user-avatar.svg'}
          alt='User Avatar'
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor='username'>Username:</label>
            <input
              id='username'
              type='text'
              className={css.input}
              defaultValue={user?.username || 'Your name'}
              name='username'
            />
          </div>

          <p>Email: {user?.email || 'user_email@example.com'}</p>

          <div className={css.actions}>
            <button type='submit' className={css.saveButton}>
              Save
            </button>
            <button
              type='button'
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
