import React, { InputHTMLAttributes } from 'react';
import { classNames } from '../../lib/stylingFunctions';

export const Input = ({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...rest}
      className={classNames(
        'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-white text-black',
        className ?? ''
      )}
    />
  );
};
