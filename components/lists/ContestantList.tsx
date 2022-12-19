import React from 'react';
import { classNames } from '../../lib/stylingFunctions';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { slugify } from '../../lib/slugify';

const ContestantList = ({
  riders,
  activeRider,
}: {
  riders: any[];
  activeRider: any;
}) => {
  const router = useRouter();
  const { rideName } = router.query;

  console.log(activeRider);

  return (
    <div className='flex flex-col justify-start items-center w-full gap-2'>
      {riders.map((rider) => {
        const isActive = rider.riderName === activeRider[0].riderName;
        return (
          <button
            onClick={() =>
              router.push(
                `/${rideName}/contestants/${slugify(rider.riderName)}`
              )
            }
            key={rider._id}
            className={classNames(
              `py-2 w-full rounded-lg border`,
              isActive ? 'border-primary' : 'border-[#292929]',
              'hover:bg-blue-100/50'
            )}>
            {rider.riderName}
          </button>
        );
      })}
    </div>
  );
};

export default ContestantList;
