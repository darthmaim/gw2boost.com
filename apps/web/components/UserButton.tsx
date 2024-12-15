import { getUser, logoutAction } from '@/lib/session';
import type { FC } from 'react';
import styles from './UserButton.module.css';
import { Button } from './Button';

export const UserButton: FC = async () => {
  const user = await getUser();

  return user ? (
    <div className={styles.user}>
      <span>{user.name}</span>
      <form action={logoutAction}><Button type="submit" appearance="secondary">Logout</Button></form>
    </div>
  ) : (
    <Button type="link" href="/login">Login</Button>
  );
};
