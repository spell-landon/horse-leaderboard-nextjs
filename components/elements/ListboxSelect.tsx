import React, { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';

type Options = {
  id: number;
  name: string;
};

function ListboxSelect({
  name,
  options,
  onChange,
  initialValue,
}: {
  name: string;
  options: Options[];
  onChange: (e: any) => void;
  initialValue: string;
}) {
  const [selected, setSelected] = useState(options[0]);

  // Set selected to initial value on load
  useEffect(() => {
    const findInitial = _.find(options, { name: initialValue }) || 0;
    const initialId = findInitial.id;
    setSelected({ id: initialId, name: initialValue });
  }, [initialValue]);

  const handleChange = (e: any) => {
    setSelected(e);
    onChange(e.name);
  };

  return (
    <div className='w-full max-w-xs'>
      <Listbox name={name} value={selected} onChange={handleChange}>
        <Listbox.Button className='relative w-full min-w-[6rem] rounded-xl border border-gray-300 py-3 pr-10 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-white text-black transition-all'>
          <span className='block truncate'>{selected.name}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <Listbox.Options className='absolute mt-1 max-h-60 w-full max-w-[6rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 max-w-xs ${
                    active ? 'bg-primary/10 text-primary' : 'text-gray-900'
                  }`
                }
                value={option}>
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}>
                      {option.name}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primary'>
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

export default ListboxSelect;
