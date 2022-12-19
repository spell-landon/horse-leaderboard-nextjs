import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
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
  const selectColor = (color: string) => {
    if (color === 'primary') {
      return 'primary';
    } else if (color === 'secondary') {
      return 'secondary';
    } else if (color === 'black') {
      return 'black/50';
    } else {
      return color;
    }
  };

  const hover = color === 'black' ? 'bg-gray-50' : `bg-${color}/90`;

  return to ? (
    <Link
      href={to}
      className={classNames(
        `rounded-md shadow-md py-3 px-3 md:px-6 hover:${hover} text-xs md:text-base flex justify-center items-center`,
        primary ? `text-white bg-${selectColor(color)}` : '',
        secondary
          ? `text-${selectColor(
              color
            )} bg-transparent border border-${selectColor(color)}`
          : '',
        fill ? 'w-full' : 'w-fit'
      )}>
      {children}
    </Link>
  ) : (
    <button
      {...rest}
      className={classNames(
        `rounded-md shadow-md py-3 px-3 md:px-6 hover:${hover} text-xs md:text-base flex justify-center items-center`,
        primary ? `text-white bg-${selectColor(color)}` : '',
        secondary
          ? `text-${selectColor(
              color
            )} bg-transparent border border-${selectColor(color)}`
          : '',
        fill ? 'w-full' : 'w-fit'
      )}>
      {children}
    </button>
  );
};
