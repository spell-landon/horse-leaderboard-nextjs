import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { classNames } from '../../lib/stylingFunctions';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean | undefined;
  secondary?: boolean | undefined;
  to?: string | undefined;
  color: 'primary' | 'secondary' | 'black' | any;
  children: any;
  fill?: boolean;
}

export const Button = ({
  primary,
  secondary,
  to,
  color,
  fill,
  children,
  ...rest
}: ButtonProps) => {
  const mainColor = color === 'black' ? 'black/50' : color;
  const hover = color === 'black' ? 'bg-gray-50' : `bg-${color}/90`;
  return to ? (
    <Link
      href={to}
      className={classNames(
        `rounded-md shadow-md py-3 px-3 md:px-6 hover:${hover} text-xs md:text-base`,
        primary ? `text-white bg-${mainColor}` : '',
        secondary
          ? `text-${mainColor} bg-transparent border border-${mainColor}`
          : '',
        fill ? 'w-full' : 'w-fit'
      )}>
      {children}
    </Link>
  ) : (
    <button
      {...rest}
      className={classNames(
        `rounded-md shadow-md py-3 px-3 md:px-6 hover:${hover} text-xs md:text-base`,
        primary ? `text-white bg-${mainColor}` : '',
        secondary
          ? `text-${mainColor} bg-transparent border border-${mainColor}`
          : '',
        fill ? 'w-full' : 'w-fit'
      )}>
      {children}
    </button>
  );
};
