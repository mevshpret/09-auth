'use client';

import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function Header() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className={css.header}>
      <Link href='/' aria-label='Home' className={css.headerLink}>
        NoteHub
      </Link>
      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href='/' className={css.navigationLink}>
              Home
            </Link>
          </li>

          {isAuthenticated && (
            <li className={css.navigationItem}>
              <Link href='/notes/filter/all' className={css.navigationLink}>
                Notes
              </Link>
            </li>
          )}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
