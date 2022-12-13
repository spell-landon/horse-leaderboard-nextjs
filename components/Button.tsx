import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { classNames } from '../lib/stylingFunctions';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean | undefined;
  secondary?: boolean | undefined;
  to?: string | undefined;
  color: 'primary' | 'secondary' | any;
  children: any;
}

export const Button = ({
  primary,
  secondary,
  to,
  color,
  children,
  ...rest
}: ButtonProps) => {
  return to ? (
    <Link
      href={to}
      className={classNames(
        `text-${color} bg-transparent rounded-md shadow-md py-3 px-6 hover:bg-black/5 border border-${color}`,
        primary ? `text-white bg-${color}` : ''
        // FINISH THE BUTTONS
      )}>
      {children}
    </Link>
  ) : (
    <button
      {...rest}
      className={classNames(
        `text-${color} bg-transparent rounded-md shadow-md py-3 px-6 hover:bg-black/5 border border-${color}`
      )}>
      {children}
    </button>
  );
};
