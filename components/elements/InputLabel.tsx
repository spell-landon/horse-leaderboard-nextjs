import React, { LabelHTMLAttributes } from 'react';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor:
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | string;
  children: string | any;
}

export const InputLabel = ({ htmlFor, children, ...rest }: InputLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      {...rest}
      className='block text-sm font-medium text-gray-700'>
      {children}
    </label>
  );
};
