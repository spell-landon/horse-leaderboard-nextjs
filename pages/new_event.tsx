import React, { useState } from 'react';
import { Button } from '../components/elements/Button';
import { Layout } from '../components/global/Layout';
import { useRouter } from 'next/router';

import { VET_JUDGES, HSP_JUDGES } from '../lib/placeholders';
import { InputLabel } from '../components/elements/InputLabel';
import { Input } from '../components/elements/Input';
import useAuth from '../hooks/useAuth';
import { slugify } from '../lib/slugify';

interface NewEventProps {
  name: string;
  startDate: string;
  endDate: string;
  region: string;
  judges: {
    vet: string[];
    hsp: string[];
  };
  riders: any[];
}

const NewEvent = () => {
  const router = useRouter();
  const [vetJudges, setVetJudges] = useState<string[]>(['']);
  const [hspJudges, setHspJudges] = useState<string[]>(['']);

  const emptyEvent: NewEventProps = {
    name: '',
    startDate: '',
    endDate: '',
    region: '',
    judges: {
      vet: vetJudges,
      hsp: hspJudges,
    },
    riders: [{}],
  };
  const { user, loading } = useAuth();
  const [newEvent, setNewEvent] = useState<NewEventProps>(emptyEvent);

  const [nameErrMessage, setNameErrMessage] = useState('');

  const handleChange = (e: any) => {
    e.preventDefault();
    setNewEvent({ ...newEvent, [e.target.id]: e.target.value });
  };
  // FIXME
  const handleVetJudges = () => {};
  // FIXME
  const handleHspJudges = () => {};
  // FIXME
  const addNewVetJudge = () => {};

  const handleSubmit = async (e: any) => {
    console.log(slugify(newEvent.name));
    e.preventDefault();
    //if either part of the form isn't filled out
    //set an error message and exit
    if (newEvent.name === '') {
      setNameErrMessage('This event must have a name');
    } else {
      //otherwise send the todo to our api
      // (we'll make this next!)
      const createEvent = await fetch('/api/create_event', {
        method: 'POST',
        body: JSON.stringify({
          ...newEvent,
          slug: {
            _type: 'slug',
            current: `${slugify(newEvent.name)}`,
          },
          user: user.email,
        }),
      });
      if (createEvent.ok) {
        const eventNameSlug = newEvent.name.toLowerCase().split(' ').join('-');
        router.push(`${eventNameSlug}`);
      } else {
      }
      // await fetchTodos(); //(we'll add this later)
      // Clear all inputs after the todo is sent to Sanity
      setNewEvent(emptyEvent);
      setNameErrMessage('');
    }
  };

  return (
    <Layout>
      <form className='w-full bg-gray-100 h-full' onSubmit={handleSubmit}>
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
                    value={newEvent.name}
                    onChange={handleChange}
                    placeholder={nameErrMessage ? nameErrMessage : ''}
                    onFocus={() => setNameErrMessage('')}
                    className={`placeholder:text-red-500 ${
                      nameErrMessage && 'border-red-500'
                    }`}
                  />
                </div>
              </div>
              <div className='font-normal text-base text-black/50 flex justify-start items-center gap-4 mt-3'>
                <div className='flex flex-col'>
                  <InputLabel htmlFor={'startDate'}>Start date</InputLabel>
                  <div className='mt-1'>
                    <Input
                      id={'startDate'}
                      name={'startDate'}
                      type='date'
                      value={newEvent.startDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='flex flex-col'>
                  <InputLabel htmlFor={'endDate'}>End date</InputLabel>
                  <div className='mt-1'>
                    <Input
                      id={'endDate'}
                      name={'endDate'}
                      type='date'
                      value={newEvent.endDate}
                      onChange={handleChange}
                      className='text-black'
                    />
                  </div>
                </div>

                <div className='flex flex-col'>
                  <InputLabel htmlFor={'region'}>Region</InputLabel>
                  <div className='mt-1'>
                    <Input
                      id={'region'}
                      name={'region'}
                      type='text'
                      value={newEvent.region}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Edit Ride Button */}
            <Button primary color='primary' type='submit'>
              Save
            </Button>
          </div>
        </div>
        {/* Main Content */}
        <div className='w-full h-full max-w-5xl mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8 min-h-[calc(100vh-72px-122px)]'>
          {/* Judges */}
          <div>
            <h2 className='font-medium text-lg text-black/80'>Judges</h2>
            {/* START FIXME */}
            <div className='w-full flex flex-col md:flex-row gap-4 items-start mt-2'>
              <div className='w-full flex flex-col gap-4 items-end'>
                {vetJudges.map((judge, index) => {
                  const key = `vet-judge-${index}`;
                  return (
                    <div key={key} className='w-full flex flex-col'>
                      <InputLabel htmlFor={key}>Vet name</InputLabel>
                      <div className='mt-1'>
                        <Input
                          id={`judge-${index}`}
                          name={`judge-${index}`}
                          type='text'
                          value={judge}
                          onChange={handleVetJudges}
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
                {hspJudges.map((judge, index) => {
                  const key = `hsp-judge-${index}`;
                  return (
                    <div key={key} className='w-full flex flex-col'>
                      <InputLabel htmlFor='key'>Hsp name</InputLabel>
                      <div className='mt-1'>
                        <Input
                          id={key}
                          name={key}
                          type='text'
                          value={judge}
                          onChange={() => console.log('')}
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
            {/* END FIXME */}
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default NewEvent;
