import type { FC, ReactNode } from 'react';
import styles from './Button.module.css';
import Link from 'next/link';

export type ButtonProps = {
  children: ReactNode,
  appearance?: 'primary' | 'secondary',
} & (
  | { type: 'link', href: string }
  | { type?: 'button' | 'submit' }
);

export const Button: FC<ButtonProps> = ({ children, appearance = 'primary', ...props }) => {
  if(props.type === 'link') {
    return <Link href={props.href} className={styles[appearance]}>{children}</Link>
  }

  return (
    <button type={props.type ?? 'button'} className={styles[appearance]}>{children}</button>
  );
};
