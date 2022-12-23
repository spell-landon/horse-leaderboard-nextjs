import React from 'react';
import { classNames } from '../../lib/stylingFunctions';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { slugify } from '../../lib/slugify';
import { Button } from '../elements/Button';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    <div className='flex flex-col justify-between items-center w-full h-full'>
      <div className='flex flex-col justify-start w-full h-full gap-2 overflow-y-hidden'>
        <Link
          href='#'
          className='mb-8 text-white/50 hover:text-white flex w-full justify-start items-center gap-2 transition'>
          <ArrowBackIcon className='h-5 w-5' />
          Back to event
        </Link>
        {riders &&
          riders?.map((rider) => {
            const isActive = rider?.riderName === activeRider[0]?.riderName;
            return (
              <button
                onClick={() =>
                  router.push(
                    `/${rideName}/contestants/${slugify(rider?.riderName)}`
                  )
                }
                key={rider._id}
                className={classNames(
                  `py-2 w-full rounded-lg border transition hover:bg-[#303030] text-white`,
                  isActive ? 'border-primary' : 'border-[#292929]'
                )}>
                {rider?.riderName}
              </button>
            );
          })}
      </div>
      <Button primary color='primary' fill>
        <AddIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
        New Rider
      </Button>
    </div>
  );
};

export default ContestantList;
