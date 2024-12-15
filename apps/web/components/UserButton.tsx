import { getUser, logoutAction } from '@/lib/session';
import type { FC } from 'react';
import styles from './UserButton.module.css';
import { Button } from './Button';
import Link from 'next/link';

export const UserButton: FC = async () => {
  const user = await getUser();

  return user ? (
    <div className={styles.user}>
      <Link href="/dashboard">{user.name}</Link>
      <form action={logoutAction}><Button type="submit" appearance="secondary">Logout</Button></form>
    </div>
  ) : (
    <Button type="link" href="/login">Login</Button>
  );
};
