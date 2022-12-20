import React, { useState, useEffect } from 'react';
import { makeTitle } from '../lib/makeTitle';
import client from '../lib/sanity/client';
import { useRouter } from 'next/router';
import { InputLabel } from './elements/InputLabel';
import { Input } from './elements/Input';
import ListboxSelect from './elements/ListboxSelect';
import { RiderClass, RiderTypes } from '../types/rider';
import TextArea from './elements/TextArea';

const HorsemanshipScorecard = () => {
  const router = useRouter();
  const { contestant } = router.query;
  const [activeContestant, setActiveContestant] = useState(null);
  const [editedContestant, setEditedContestant] = useState(null);

  const fetchContestant = async () => {
    const getContestant = await client.fetch(
      `*[_type=='rider' && riderName == $name]{
            ...,
            'horsemanshipScorecard': horsemanshipScorecard {
               _type=='reference'=> @->, 
            }
        }`,
      { name: makeTitle(contestant) }
    );
    setActiveContestant(getContestant[0]);
  };

  useEffect(() => {
    fetchContestant();
  }, [router]);

  useEffect(() => {
    console.log(activeContestant);
    setEditedContestant(activeContestant);
  }, [activeContestant]);

  const handleChange = (e: any) => {
    setEditedContestant({ ...editedContestant, [e.target.id]: e.target.value });
  };

  const handleListbox = (e: any, name) => {
    setEditedContestant({ ...editedContestant, [name]: e });
  };

  const handleGeneral = (e: any) => {
    console.log(e.target.id);

    setEditedContestant((current) => {
      const general = { ...current?.horsemanshipScorecard?.qualifiers.general };
      return {
        ...current,
        [editedContestant?.horsemanshipScorecard?.qualifiers.general]: {
          ...general,
          [e.target.id]: e.target.value,
        },
      };
      //   return {
      //     ...current,
      //     horsemanshipScorecard: {
      //       ...current.horsemanshipScorecard,
      //       qualifiers: {
      //         ...current.horsemanshipScorecard.qualifiers,
      //         general: {
      //           ...current.horsemanshipScorecard.qualifiers.general,
      //           [e.target.id]: e.target.value,
      //         },
      //       },
      //     },
      //   };
    });
  };

  console.log('Edited: ', editedContestant);

  return (
    <form className='w-full flex flex-col gap-6 py-4 overflow-y-scroll h-full'>
      <div className='flex justify-start items-start gap-4'>
        {/* Rider General Info */}
        <div className='flex flex-col'>
          <InputLabel htmlFor={'riderName'}>Rider Name</InputLabel>
          <div className='mt-1'>
            <Input
              id={'riderName'}
              name={'riderName'}
              type='string'
              value={editedContestant?.riderName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <InputLabel htmlFor={'riderNumber'}>Rider Number</InputLabel>
          <div className='mt-1'>
            <Input
              id={'riderNumber'}
              name={'riderNumber'}
              type='string'
              value={editedContestant?.riderNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <InputLabel htmlFor={'type'}>Type</InputLabel>
          <div className='mt-1'>
            <ListboxSelect
              name={'type'}
              options={RiderTypes}
              onChange={(e) => handleListbox(e, 'type')}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <InputLabel htmlFor={'class'}>Class</InputLabel>
          <div className='mt-1'>
            <ListboxSelect
              name={'class'}
              options={RiderClass}
              onChange={(e) => handleListbox(e, 'class')}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-start items-start gap-4'>
        {/* Tack & Equipment */}
        <TextArea
          htmlFor={'tackAndEquipment'}
          label={'Tack & Equipment'}
          subText='Cleanliness, proper fit, adjustment, repair, trail gear replacement
            & security'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.general
              .tackAndEquipment
          }
          onChange={(e: any) => handleGeneral(e)}
        />
        {/* Grooming */}
        <TextArea
          htmlFor={'grooming'}
          label={'Grooming'}
          subText='Brushing, Dirt, Sweat Marks, External Parasites, Feet & Shoeing'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.general.grooming
          }
          onChange={(e: any) => handleGeneral(e)}
        />

        {/* In-Hand Presentation */}
        <TextArea
          htmlFor={'inHandPresentation'}
          label={'In-Hand Presentation'}
          subText='Safety, Turning, Lead Rope, Consideration of Others, Response to
            Directions, Teamwork (TW)'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.general
              .inHandPresentation
          }
          onChange={(e: any) => handleGeneral(e)}
        />

        {/* General Score */}
        <div className='flex justify-end items-center gap-4 w-fit ml-auto'>
          <InputLabel htmlFor={'generalScore'}>Total Score:</InputLabel>

          <Input
            id={'generalScore'}
            name={'generalScore'}
            type='string'
            value={
              editedContestant?.horsemanshipScorecard?.qualifiers.general.score
            }
            onChange={handleChange}
            className='max-w-[4rem] text-center'
          />
          <span className='text-sm font-medium text-gray-700'>/ 20</span>
        </div>
      </div>
    </form>
  );
};

export default HorsemanshipScorecard;
