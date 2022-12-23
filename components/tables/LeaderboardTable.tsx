import React, { useState, useEffect } from 'react';
import { RiderProps } from '../../types/rider';
import EmptyTable from './EmptyTable';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { slugify } from '../../lib/slugify';
import { Button } from '../elements/Button';

interface LeaderboardTableProps {
  contestants: RiderProps[];
}
const LeaderboardTable = ({ contestants }: LeaderboardTableProps) => {
  const router = useRouter();
  console.log(router);
  const { rideName } = router.query;
  const [sortedContestants, setSortedContestants] = useState(contestants);
  const [showEmpty, setShowEmpty] = useState(false);
  // const [sorting, setSorting] = useState(false);

  const riderPosition = () => {
    const newArr = _.sortBy(sortedContestants, function (o: any) {
      return o.horsemanshipScorecard?.overallScore;
    });
    const reverseArr = _.reverse(newArr);
    setSortedContestants(reverseArr);
  };

  // const toggleSorting = () => {
  //   setSorting(!sorting);
  // };

  // const reverseSort = () => {
  //   console.log('sorting...');
  //   const reverse = _.reverse(sortedContestants);
  //   setSortedContestants(reverse);
  //   setSorting(false);
  // };

  useEffect(() => {
    riderPosition();
    if (!contestants.length || contestants[0].riderName === '') {
      setShowEmpty(true);
    }
  }, []);

  // useEffect(() => {
  //   if (sorting === true) {
  //     reverseSort();
  //   }
  // }, [sorting]);
  console.log(contestants.length);

  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='w-full divide-y divide-gray-300'>
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
                    {/* <th
                      scope='col'
                      className=' py-2 text-left text-sm font-semibold text-gray-900 '>
                      <button
                        onClick={toggleSorting}
                        className='bg-black/5 px-3 py-2 rounded-lg hover:bg-black/10'>
                        Sort by Score
                      </button>
                    </th> */}
                  </tr>
                </thead>
                {showEmpty ? (
                  <EmptyTable type='riders' />
                ) : (
                  <tbody className='divide-y divide-gray-200'>
                    {contestants?.length &&
                      sortedContestants.map((contestant, index) => (
                        <tr
                          key={contestant.riderName}
                          className='hover:bg-black/5 cursor-pointer transition'
                          onClick={() =>
                            router.push(
                              `/${rideName}/contestants/${slugify(
                                contestant.riderName
                              )}`
                            )
                          }>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                            {contestant.riderName}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {contestant.riderNumber}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {contestant.horseName}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {contestant.horsemanshipScorecard?.overallScore}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {contestant.horsemanshipScorecard?.scoreSubtotal}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {index + 1}
                          </td>
                        </tr>
                      ))}

                    {!contestants?.length ||
                      (contestants[0].riderName === '' && (
                        <EmptyTable type='riders' />
                      ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        <div className='w-fit ml-auto mt-6'>
          <Button
            secondary
            color='secondary'
            onClick={() => router.push(`/${rideName}/contestants`)}>
            Take me to all contestants
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;
