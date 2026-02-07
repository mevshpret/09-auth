import { Metadata } from 'next';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import { getMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description:
    'User profile page where you can view and edit your personal information.',
  openGraph: {
    title:
      'User profile page where you can view and edit your personal information.',
    description:
      'User profile page where you can view and edit your personal information.',
    url: 'https://08-zustand-five-liart.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default async function ProfilePage() {
  const userData = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href='/profile/edit' className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={userData.avatar || '/user-avatar.svg'}
            alt='User Avatar'
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>User Name: {userData.username || 'Your Name'}</p>
          <p>Email: {userData.email || 'your_email@example.com'}</p>
        </div>
      </div>
    </main>
  );
}
