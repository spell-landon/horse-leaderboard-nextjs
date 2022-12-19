// React
import React, { useState, useEffect } from 'react';
// Next
import { useRouter } from 'next/router';
// Components
import { Layout } from '../../components/global/Layout';
import { Button } from '../../components/elements/Button';
import JudgesTable from '../../components/tables/JudgesTable';
import LeaderboardTable from '../../components/tables/LeaderboardTable';
import EmptyList from '../../components/elements/EmptyList';
// Lib
import client from '../../lib/sanity/client';
import useAuth from '../../hooks/useAuth';
// Types
import { EventProps } from '../../types/event';
// Dependencies
import moment from 'moment';
// MUI Icons
import CircleIcon from '@mui/icons-material/Circle';

const Overview = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { rideName } = router.query;

  const [event, setEvent] = useState<EventProps[] | null>(null);

  const fetchevent = async () => {
    if (user && !loading) {
      console.log('there is a user');
      const fetchedEvent = await client.fetch(
        `*[_type=='event' && userEmail==$userEmail && slug.current==$slug]{
          ...,
          'riders': riders[]{
            _type=='reference' => @-> {
              ...,
              'horsemanshipScorecard': horsemanshipScorecard {
                _type=='reference' => @->,
              },
            },
          },
        }`,
        {
          userEmail: user.email,
          slug: rideName,
        }
      );

      setEvent(fetchedEvent[0]);
    }
    if (!user && !loading) {
      console.log('no user!');
      const fetchedEvent = await client.fetch(
        `*[_type=='event' && slug.current==$slug]{
            ...,
            'riders': riders[]{
              _type=='reference' => @-> {
                ...,
                'horsemanshipScorecard': horsemanshipScorecard {
                  _type=='reference' => @->,
                },
              },
            },
        }`,
        {
          slug: rideName,
        }
      );
      setEvent(fetchedEvent[0]);
    }
  };

  useEffect(() => {
    fetchevent();
  }, [rideName]);

  useEffect(() => {
    console.log(event);
  }, [event]);

  if (!event) return null;
  if (loading) return <EmptyList />;

  return (
    <Layout>
      <div className='w-full bg-gray-100 h-full'>
        {/* Header */}
        <div className='bg-white border border-b-black/10 shadow-sm px-4 lg:px-0 py-8'>
          <div className='w-full max-w-5xl mx-auto flex justify-between items-center'>
            {/* Ride Info */}
            <div className='flex flex-col'>
              <h1 className='font-bold text-2xl text-black capitalize'>
                {event?.name}
              </h1>
              <div className='font-normal text-base text-black/50 flex flex-col md:flex-row justify-start items-start md:items-center gap-1 md:gap-3'>
                <div className='flex flex-col md:flex-row justify-start items-start md:items-center gap-1'>
                  <div className='flex gap-1'>
                    <p className='md:hidden'>Start: </p>
                    <p className='text-black'>
                      {moment(event?.startDate).format('LL')}
                    </p>
                  </div>
                  <span className='hidden md:block'> - </span>
                  <div className='flex gap-1'>
                    <p className='md:hidden'>End: </p>
                    <p className='text-black'>
                      {moment(event?.endDate).format('LL')}
                    </p>
                  </div>
                </div>
                <CircleIcon
                  sx={{ height: '6px', width: '6px' }}
                  className='hidden md:block'
                />
                <div className='flex gap-1'>
                  <p>Region </p>
                  <p className='text-black'>{event?.region}</p>
                </div>
              </div>
            </div>
            {/* Edit Ride Button */}
            <Button secondary color='black' to={`/${rideName}/edit`}>
              Edit Ride
            </Button>
          </div>
        </div>
        {/* Main Content */}
        <div className='w-full h-full max-w-5xl mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8 min-h-[calc(100vh-72px-122px)]'>
          {/* Judges */}
          <div>
            <h2 className='font-medium text-lg text-black/80'>Judges</h2>
            <div className='w-full flex flex-col md:flex-row gap-4 items-start'>
              <JudgesTable
                data={event?.judges.vet}
                headerLabels={['Vet Judges']}
              />
              <JudgesTable
                data={event?.judges.hsp}
                headerLabels={['HSP Judges']}
              />
            </div>
          </div>
          {/* Leaderboard */}
          <div>
            <h2 className='font-medium text-lg text-black/80'>Leaderboard</h2>
            <div className='w-full flex flex-col md:flex-row gap-4 items-center'>
              <LeaderboardTable contestants={event?.riders} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
