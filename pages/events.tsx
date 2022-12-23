import React, { useEffect, useState } from 'react';
import { EventProps } from '../types/rider';
import client from '../lib/sanity/client';
import EmptyList from '../components/elements/EmptyList';
import { Layout } from '../components/global/Layout';
import useAuth from '../hooks/useAuth';
import moment from 'moment';
import { Button } from '../components/elements/Button';
import { useRouter } from 'next/router';

const Events = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<EventProps[]>([]);

  const fetchEvents = async () => {
    let fetchedEvents;
    if (user && !loading) {
      fetchedEvents = await client.fetch(
        `*[_type=='event' && userEmail==$userEmail]`,
        { userEmail: user.email }
      );
      setEvents(fetchedEvents);
    }
    if (!user && !loading) {
      fetchedEvents = await client.fetch(
        `*[_type=='event']{
        _id, endDate, judges, name, region, startDate,
        'riders': riders[]{
            _type=='reference' => @-> 
        },
      }`,
        {}
      );
      setEvents(fetchedEvents);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [loading, user]);

  console.log(events);

  return (
    <Layout>
      <div className='w-full'>
        <div className='mt-2 flex flex-col'>
          <div className='-my-2 overflow-x-auto'>
            <div className='inline-block w-full py-2 align-middle px-4 md:px-6 lg:px-8'>
              <div className='overflow-scroll shadow ring-1 ring-black ring-opacity-5 rounded-lg mt-8'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                        Ride Name
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Start Date
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        End Date
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Region
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                        Riders
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {events &&
                      events.map((event) => (
                        <tr
                          key={event.name}
                          className='hover:bg-black/5 hover:cursor-pointer'
                          onClick={() =>
                            router.push(
                              `/${event.name
                                .toLowerCase()
                                .split(' ')
                                .join('-')}`
                            )
                          }>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                            {event.name}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {moment(event.startDate).format('L')}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {moment(event.endDate).format('L')}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {event.region}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {event.riders.length}
                          </td>
                        </tr>
                      ))}
                    {!events && !loading && <EmptyList />}
                  </tbody>
                </table>
              </div>
              <div className='mt-8 w-full flex items-center justify-end'>
                <Button to='/new_event' primary color='primary'>
                  Add New Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
