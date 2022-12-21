import React from 'react';
import { InputLabel } from './InputLabel';

const TextArea = ({
  htmlFor,
  label,
  subText,
  value,
  onChange,
}: {
  htmlFor: string;
  label: string;
  subText: string;
  value: string;
  onChange: (e: any) => void;
}) => {
  return (
    <div className='flex flex-col w-full'>
      <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
      <span className='text-sm text-black/50 font-normal capitalize'>
        {subText}
      </span>
      <div className='mt-1'>
        <textarea
          id={htmlFor}
          name={htmlFor}
          onChange={onChange}
          rows={3}
          value={value}
          className='block w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-white text-black'
        />
      </div>
    </div>
  );
};

export default TextArea;
