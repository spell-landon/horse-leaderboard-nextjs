import React, { InputHTMLAttributes } from 'react';
import { classNames } from '../../lib/stylingFunctions';

export const Input = ({
  className,
  ref,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { ref?: any }) => {
  return (
    <input
      {...rest}
      ref={ref}
      className={classNames(
        'block w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-white text-black transition-all',
        className ?? ''
      )}
    />
  );
};
