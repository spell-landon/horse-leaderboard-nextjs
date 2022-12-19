import React from 'react';
import EmptyTable from './EmptyTable';

const JudgesTable = ({
  data,
  headerLabels,
}: {
  data: any[];
  headerLabels: string[];
}) => {
  console.log('JUDGE DATA: ', data);

  return (
    <div className='w-full'>
      <div className='mt-2 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  {headerLabels.map((label, index) => {
                    const key = `label-${index}`;
                    return (
                      <tr key={key}>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                          {label}
                        </th>
                      </tr>
                    );
                  })}
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {data?.length ? (
                    data.map((person) => (
                      <tr key={person}>
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                          {person}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className='py-6'>
                      <EmptyTable type='judges' />
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgesTable;
