import React, { useState, useEffect } from 'react';
import client from '../../../lib/sanity/client';
import { Layout } from '../../../components/global/Layout';
import { useRouter } from 'next/router';
import { makeTitle } from '../../../lib/makeTitle';
import ContestantList from '../../../components/lists/ContestantList';
import ContestantDetails from '../../../components/ContestantDetails';

const Contestants = () => {
  const router = useRouter();
  const { contestant, rideName } = router.query;
  const [activeRide, setActiveRide] = useState(null);
  const [riders, setRiders] = useState([]);
  const [activeContestant, setActiveContestant] = useState(null);

  const fetchContestant = async () => {
    const getContestant = await client.fetch(
      `*[_type=='rider' && riderName == $name]`,
      { name: makeTitle(contestant) }
    );
    setActiveContestant(getContestant);
  };

  const fetchRide = async () => {
    if (!rideName) return null;
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
    setActiveRide(fetchedEvent);
  };

  useEffect(() => {
    fetchRide().then(() => fetchContestant());
  }, [rideName, contestant]);

  useEffect(() => {
    if (activeRide) {
      setRiders(activeRide[0].riders);
    }
  }, [activeRide]);

  if (!activeRide || !activeContestant) return null;

  return (
    <Layout>
      <div className='flex flex-row justify-between items-start w-screen overflow-hidden h-[calc(100vh-64px)] md:h-[calc(100vh-72px)]'>
        <div className='w-full max-w-[200px] bg-[#292929] h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] p-4'>
          <ContestantList riders={riders} activeRider={activeContestant} />
        </div>

        {activeContestant && (
          <ContestantDetails
            event={rideName}
            contestant={activeContestant[0]}
            eventId={activeRide[0]._id}
            activeRide={activeRide}
          />
        )}
      </div>
    </Layout>
  );
};

export default Contestants;
