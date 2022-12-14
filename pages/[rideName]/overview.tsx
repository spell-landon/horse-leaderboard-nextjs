import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../../components/elements/Button';
import { Layout } from '../../components/global/Layout';

// MUI Icons
import CircleIcon from '@mui/icons-material/Circle';

const Overview = () => {
  const router = useRouter();
  const { rideName } = router.query;

  const vetJudges = [
    {
      name: 'Lindsay Walton',
      role: 'vet_judge',
    },
    {
      name: 'Sam Bass',
      role: 'vet_judge',
    },
  ];
  const hspJudges = [
    {
      name: 'Jennifer Fallin',
      role: 'hsp_judge',
    },
    {
      name: 'Josh Applin',
      role: 'hsp_judge',
    },
  ];

  const contestants = [
    {
      name: 'Cara Liebman',
      number: '63',
      horse: 'Flash Black',
      riderScore: '97',
      horseScore: '90',
      position: '1',
    },
    {
      name: 'David Spell',
      number: '64',
      horse: 'Gage',
      riderScore: '96',
      horseScore: '89',
      position: '2',
    },
    {
      name: 'John Smith',
      number: '23',
      horse: 'Alfonso',
      riderScore: '80',
      horseScore: '79',
      position: '3',
    },
  ];

  return (
    <Layout>
      <div className='w-full bg-gray-100 h-full'>
        {/* Header */}
        <div className='bg-white border border-b-black/10 shadow-sm px-4 lg:px-0 py-8'>
          <div className='w-full max-w-5xl mx-auto flex justify-between items-center'>
            {/* Ride Info */}
            <div className='flex flex-col'>
              <h1 className='font-bold text-2xl text-black'>{rideName}</h1>
              <div className='font-normal text-base text-black/50 flex justify-start items-center gap-3'>
                <div className='flex justify-start items-center gap-1'>
                  <p>November 2, 2019</p>
                  <span> - </span>
                  <p>November 3, 2019</p>
                </div>
                <CircleIcon sx={{ height: '6px', width: '6px' }} />
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
              <div className='w-full'>
                <div className='mt-2 flex flex-col'>
                  <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                      <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                        <table className='min-w-full divide-y divide-gray-300'>
                          <thead className='bg-gray-50'>
                            <tr>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                                Vet Judges
                              </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-gray-200 bg-white'>
                            {vetJudges.map((person) => (
                              <tr key={person.name}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                  {person.name}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <div className='mt-2 flex flex-col'>
                  <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                      <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                        <table className='min-w-full divide-y divide-gray-300'>
                          <thead className='bg-gray-50'>
                            <tr>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                                HSP Judges
                              </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-gray-200 bg-white'>
                            {hspJudges.map((person) => (
                              <tr key={person.name}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                  {person.name}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Leaderboard */}
          <div>
            <h2 className='font-medium text-lg text-black/80'>Leaderboard</h2>
            <div className='w-full flex gap-4 items-center'>
              <div className='w-full'>
                <div className='mt-2 flex flex-col'>
                  <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                      <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                        <table className='min-w-full divide-y divide-gray-300'>
                          <thead className='bg-gray-50'>
                            <tr>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                                Rider
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                Rider Number
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                Horse
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                Rider Score
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                Horse Score
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                Position
                              </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-gray-200 bg-white'>
                            {contestants.map((contestant) => (
                              <tr key={contestant.name}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                  {contestant.name}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  {contestant.number}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  {contestant.horse}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  {contestant.riderScore}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  {contestant.horseScore}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  {contestant.position}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
