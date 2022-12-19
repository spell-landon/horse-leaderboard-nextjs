import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../components/elements/Button';
import { Layout } from '../../components/global/Layout';

// MUI Icons
import CircleIcon from '@mui/icons-material/Circle';

import { VET_JUDGES, HSP_JUDGES } from '../../lib/placeholders';
import { InputLabel } from '../../components/elements/InputLabel';
import { Input } from '../../components/elements/Input';

const EditRide = () => {
  const router = useRouter();
  const { rideName } = router.query;
  console.log(rideName);

  return (
    <Layout>
      <div className='w-full bg-gray-100 h-full'>
        {/* Header */}
        <div className='bg-white border border-b-black/10 shadow-sm px-4 lg:px-0 py-8'>
          <div className='w-full max-w-5xl mx-auto flex justify-between items-center'>
            {/* Ride Info */}
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <InputLabel htmlFor={'name'}>Event name</InputLabel>
                <div className='mt-1'>
                  <Input
                    id={'name'}
                    name={'name'}
                    type='string'
                    value={rideName}
                    onChange={() => console.log('hello')}
                  />
                </div>
              </div>
              <div className='font-normal text-base text-black/50 flex justify-start items-center gap-4 mt-3'>
                <div className='flex justify-start items-center gap-1'>
                  <div className='flex flex-col'>
                    <InputLabel htmlFor={'startDate'}>Start date</InputLabel>
                    <div className='mt-1'>
                      <Input
                        id={'startDate'}
                        name={'startDate'}
                        type='date'
                        value={'November 2, 2019'}
                      />
                    </div>
                  </div>
                  <span> - </span>
                  <div className='flex flex-col'>
                    <InputLabel htmlFor={'endDate'}>End date</InputLabel>
                    <div className='mt-1'>
                      <Input
                        id={'endDate'}
                        name={'endDate'}
                        type='date'
                        value={'November 3, 2019'}
                      />
                    </div>
                  </div>
                </div>
                <CircleIcon sx={{ height: '6px', width: '6px' }} />
                <div className='flex flex-col'>
                  <InputLabel htmlFor={'region'}>Region</InputLabel>
                  <div className='mt-1'>
                    <Input
                      id={'region'}
                      name={'region'}
                      type='text'
                      value={'4'}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Edit Ride Button */}
            <Button primary color='primary' to={`/${rideName}`}>
              Save
            </Button>
          </div>
        </div>
        {/* Main Content */}
        <div className='w-full h-full max-w-5xl mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8 min-h-[calc(100vh-72px-122px)]'>
          {/* Judges */}
          <div>
            <h2 className='font-medium text-lg text-black/80'>Judges</h2>
            <div className='w-full flex flex-col md:flex-row gap-4 items-center mt-2'>
              <div className='w-full flex flex-col gap-4 items-end'>
                {VET_JUDGES.map((judge, index) => {
                  const key = `judge-${index}`;
                  return (
                    <div key={key} className='w-full flex flex-col'>
                      <InputLabel htmlFor='vetJudgeName'>
                        Vet Judge Name
                      </InputLabel>
                      <div className='mt-1'>
                        <Input
                          id={'vetJudgeName'}
                          name={'vetJudgeName'}
                          type='text'
                          value={judge.name}
                          placeholder={judge.name}
                          className='text-black'
                        />
                      </div>
                    </div>
                  );
                })}
                <Button secondary color='black'>
                  Add New Judge
                </Button>
              </div>
              <div className='w-full flex flex-col gap-4 items-end'>
                {HSP_JUDGES.map((judge) => {
                  return (
                    <div key={judge.name} className='w-full flex flex-col'>
                      <InputLabel htmlFor='hspJudgeName'>
                        Hsp Judge Name
                      </InputLabel>
                      <div className='mt-1'>
                        <Input
                          id={'hspJudgeName'}
                          name={'hspJudgeName'}
                          type='text'
                          value={judge.name}
                          placeholder={judge.name}
                        />
                      </div>
                    </div>
                  );
                })}
                <Button secondary color='black'>
                  Add New Judge
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditRide;
