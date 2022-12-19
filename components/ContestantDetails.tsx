import React, { useState } from 'react';
import { RiderProps } from '../types/rider';
import { makeTitle } from '../lib/makeTitle';
import { Tab } from '@headlessui/react';
import { TAB_LABELS } from '../lib/contants';
import { classNames } from '../lib/stylingFunctions';
import Link from 'next/link';

const ContestantDetails = ({
  event,
  contestant,
}: {
  event: string | string[] | undefined;
  contestant: RiderProps;
}) => {
  console.log(contestant);
  const [tab, setTab] = useState(0);
  const riderName = contestant?.riderName;

  if (!contestant) return null;

  return (
    <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] w-full bg-white text-black p-4'>
      {/* Header */}
      <div className='w-full flex justify-between items-baseline mb-4'>
        <h1 className='text-2xl'>{riderName}</h1>
        <Link
          href={`/${event}`}
          className='text-xl hover:text-black/50 transition'>
          {makeTitle(event)}
        </Link>
      </div>

      {/* Tabs */}
      <Tab.Group onChange={(index) => setTab(index)}>
        <Tab.List
          className={classNames(
            'border-b border-black/10 flex w-full justify-start items-baseline gap-6'
          )}>
          {TAB_LABELS.map((label, index) => {
            return (
              <Tab key={`label_${index}`}>
                <button
                  className={classNames(
                    'text-black/50 text-lg',
                    index === tab
                      ? 'text-secondary border-b-2 border-secondary'
                      : ''
                  )}>
                  {label}
                </button>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Rider Stuff</Tab.Panel>
          <Tab.Panel>Horse Stuff</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ContestantDetails;
