import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../components/elements/Button';
import { Layout } from '../../components/global/Layout';

// MUI Icons
import CircleIcon from '@mui/icons-material/Circle';
import JudgesTable from '../../components/tables/JudgesTable';
import LeaderboardTable from '../../components/tables/LeaderboardTable';
import { RIDE_OBJECT } from '../../lib/placeholders';

const Overview = () => {
  const router = useRouter();
  const { rideName } = router.query;

  const { name, startDate, endDate, region, judges, contestants } = RIDE_OBJECT;

  return (
    <Layout>
      <div className='w-full bg-gray-100 h-full'>
        {/* Header */}
        <div className='bg-white border border-b-black/10 shadow-sm px-4 lg:px-0 py-8'>
          <div className='w-full max-w-5xl mx-auto flex justify-between items-center'>
            {/* Ride Info */}
            <div className='flex flex-col'>
              <h1 className='font-bold text-2xl text-black'>{name}</h1>
              <div className='font-normal text-base text-black/50 flex flex-col md:flex-row justify-start items-start md:items-center gap-1 md:gap-3'>
                <div className='flex flex-col md:flex-row justify-start items-start md:items-center gap-1'>
                  <div className='flex gap-1'>
                    <p className='md:hidden'>Start: </p>
                    <p>November 2, 2019</p>
                  </div>
                  <span className='hidden md:block'> - </span>
                  <div className='flex gap-1'>
                    <p className='md:hidden'>End: </p>
                    <p>November 3, 2019</p>
                  </div>
                </div>
                <CircleIcon
                  sx={{ height: '6px', width: '6px' }}
                  className='hidden md:block'
                />
                <p>Region 4</p>
              </div>
            </div>
            {/* Edit Ride Button */}
            <Button secondary color='black' to='/bell-cow-rendezvous/edit'>
              Edit Ride
            </Button>
          </div>
        </div>
        {/* Main Content */}
        <div className='w-full h-full max-w-5xl mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8 min-h-[calc(100vh-72px-122px)]'>
          {/* Judges */}
          <div>
            <h2 className='font-medium text-lg text-black/80'>Judges</h2>
            <div className='w-full flex flex-col md:flex-row gap-4 items-center'>
              <JudgesTable
                data={judges.vetJudges}
                headerLabels={['Vet Judges']}
              />
              <JudgesTable
                data={judges.hspJudges}
                headerLabels={['HSP Judges']}
              />
            </div>
          </div>
          {/* Leaderboard */}
          <div>
            <h2 className='font-medium text-lg text-black/80'>Leaderboard</h2>
            <div className='w-full flex gap-4 items-center'>
              <LeaderboardTable contestants={contestants} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
