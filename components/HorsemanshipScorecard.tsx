import React, { useState, useEffect } from 'react';
import { makeTitle } from '../lib/makeTitle';
import client from '../lib/sanity/client';
import { useRouter } from 'next/router';
import { InputLabel } from './elements/InputLabel';
import { Input } from './elements/Input';
import ListboxSelect from './elements/ListboxSelect';
import {
  RiderClass,
  RiderDivision,
  RiderProps,
  RiderTypes,
} from '../types/rider';
import TextArea from './elements/TextArea';
import { Button } from './elements/Button';
import { slugify } from '../lib/slugify';
import useAuth from '../hooks/useAuth';
import { RIDER } from '../types/placeholders';
import _ from 'lodash';

const HorsemanshipScorecard = ({
  eventId,
  activeRide,
}: {
  eventId: string;
  activeRide: any;
}) => {
  const router = useRouter();
  // Get contestant name from router query
  const { rideName, contestant } = router.query;
  // Set activeContestant
  const [activeContestant, setActiveContestant] = useState(null);
  // Set new edited Contestant that will be submitted to update Sanity CMS
  const [editedContestant, setEditedContestant] = useState<RiderProps>(RIDER);
  // Saving state for the Save Changes button
  const [saving, setSaving] = useState<boolean>(false);

  //   Fetch the contestant from the router.query onload
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

  // Fetch contestant on inital load
  useEffect(() => {
    fetchContestant();
  }, [router]);

  // When contestant is found, set as new editedContestant
  useEffect(() => {
    setEditedContestant(activeContestant);
  }, [activeContestant]);

  // Handle and root level changes to editedContestant object
  const handleChange = (e: any) => {
    setEditedContestant({ ...editedContestant, [e.target.id]: e.target.value });
    console.log(editedContestant);
  };

  const handleListbox = (e: any, name: string) => {
    setEditedContestant({
      ...editedContestant,
      [name]: e,
    });
  };

  // Handle editedContestant.horsemanshipScorecard?.qualifiers.general changes
  const handleGeneral = (e: any) => {
    setEditedContestant({
      ...editedContestant,
      horsemanshipScorecard: {
        ...editedContestant.horsemanshipScorecard,
        qualifiers: {
          ...editedContestant.horsemanshipScorecard?.qualifiers,
          general: {
            ...editedContestant.horsemanshipScorecard?.qualifiers.general,
            [e.target.id]: e.target.value,
          },
        },
      },
    });
  };

  // Handle editedContestant.horsemanshipScorecard?.qualifiers.form
  const handleForm = (e: any) => {
    setEditedContestant({
      ...editedContestant,
      horsemanshipScorecard: {
        ...editedContestant.horsemanshipScorecard,
        qualifiers: {
          ...editedContestant.horsemanshipScorecard?.qualifiers,
          form: {
            ...editedContestant.horsemanshipScorecard?.qualifiers.form,
            [e.target.id]: e.target.value,
          },
        },
      },
    });
  };

  // Handle editedContestant.horsemanshipScorecard?.qualifiers.trail
  const handleTrail = (e: any) => {
    setEditedContestant({
      ...editedContestant,
      horsemanshipScorecard: {
        ...editedContestant.horsemanshipScorecard,
        qualifiers: {
          ...editedContestant.horsemanshipScorecard?.qualifiers,
          trail: {
            ...editedContestant.horsemanshipScorecard?.qualifiers.trail,
            [e.target.id]: e.target.value,
          },
        },
      },
    });
  };

  // Handle editedContestant.horsemanshipScorecard?.penalty
  const handlePenalty = (e: any) => {
    setEditedContestant({
      ...editedContestant,
      horsemanshipScorecard: {
        ...editedContestant.horsemanshipScorecard,
        penalty: {
          ...editedContestant.horsemanshipScorecard?.penalty,
          [e.target.id]: e.target.value,
        },
      },
    });
  };
  // Handle editedContestant.horsemanshipScorecard.overallScore
  const handleOverall = (e: any) => {
    setEditedContestant({
      ...editedContestant,
      horsemanshipScorecard: {
        ...editedContestant.horsemanshipScorecard,
        [e.target.id]: e.target.value,
      },
    });
  };

  // Calculate overall score
  const overallScore = () => {
    let penaltyPoints = 0;
    if (
      editedContestant?.horsemanshipScorecard?.penalty?.penaltyPoints ===
      undefined
    ) {
      penaltyPoints === 0;
    } else {
      penaltyPoints ===
        editedContestant?.horsemanshipScorecard?.penalty?.penaltyPoints;
    }
    let sum = 0;
    sum += Number(
      editedContestant?.horsemanshipScorecard?.qualifiers.form.formScore
    );
    sum += Number(
      editedContestant?.horsemanshipScorecard?.qualifiers.general.generalScore
    );
    sum += Number(
      editedContestant?.horsemanshipScorecard?.qualifiers.trail.trailScore
    );
    sum -= Number(penaltyPoints);
    return sum.toString();
  };

  const updateHorsemanshipScorecard = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    const updateRider = async () =>
      await client
        .patch(editedContestant?._id)
        .set({
          _type: 'rider' ?? '',
          class: editedContestant.class ?? '',
          division: editedContestant.division ?? '',
          horseAge: editedContestant.horseAge ?? '',
          horseBreed: editedContestant.horseBreed ?? '',
          horseName: editedContestant.horseName ?? '',
          riderName: editedContestant.riderName,
          riderNumber: editedContestant.riderNumber ?? '',
          type: editedContestant.type ?? '',
        })
        .commit()
        .catch((err) => {
          console.log('ERROR: ', err);
          setSaving(false);
        });

    const { horsemanshipScorecard } = editedContestant;

    const updateHorsemanshipScorecard = async () =>
      await client
        .patch(horsemanshipScorecard?._id)
        .set({
          _type: 'horsemanshipScorecard' ?? '',
          overallScore: horsemanshipScorecard.overallScore ?? '',
          penalty: {
            penaltyPoints: horsemanshipScorecard.penalty.penaltyPoints ?? '',
            penaltyPointExplanation:
              horsemanshipScorecard.penalty.penaltyPointExplanation ?? '',
          },
          qualifiers: {
            form: {
              formScore: horsemanshipScorecard.qualifiers.form.formScore ?? '',
              trailEquitation:
                horsemanshipScorecard.qualifiers.form.trailEquitation ?? '',
            },
            general: {
              generalScore:
                horsemanshipScorecard.qualifiers.general.generalScore ?? '',
              grooming: horsemanshipScorecard.qualifiers.general.grooming ?? '',
              inHandPresentation:
                horsemanshipScorecard.qualifiers.general.inHandPresentation ??
                '',
              tackAndEquipment:
                horsemanshipScorecard.qualifiers.general.tackAndEquipment ?? '',
            },
            trail: {
              stabling: horsemanshipScorecard.qualifiers.trail.stabling ?? '',
              trailCare: horsemanshipScorecard.qualifiers.trail.trailCare ?? '',
              trailSafetyAndCourtesy:
                horsemanshipScorecard.qualifiers.trail.trailSafetyAndCourtesy ??
                '',
              trailScore:
                horsemanshipScorecard.qualifiers.trail.trailScore ?? '',
            },
          },
          scoreSubtotal: horsemanshipScorecard.scoreSubtotal ?? '',
        })
        .commit()
        .then(() => {
          setSaving(false);
        })
        .catch((err) => {
          console.log('ERROR: ', err);
          setSaving(false);
        });

    updateRider()
      .then(() => updateHorsemanshipScorecard())
      .finally(() =>
        router.push(
          `/${rideName}/contestants/${slugify(editedContestant?.riderName)}`
        )
      );
  };

  const deleteContestant = async (e: any) => {
    e.preventDefault();
    const idIndex = _.findIndex(activeRide[0].riders, [
      'riderName',
      editedContestant.riderName,
    ]);
    console.log(activeRide);
    console.log(idIndex);
    const contestantToRemove = [`riders[${idIndex}]`];
    const removeFromEvent = async () =>
      await client
        .patch(eventId)
        .unset(contestantToRemove)
        .commit()
        .catch((err) => console.log(err));

    const deleteRider = async () => await client.delete(editedContestant._id);
    // .catch((err) => console.log(err));

    removeFromEvent()
      .then((res) => console.log(res))
      .then(() => {
        router.push(`/${rideName}/contestants`);
      });
  };

  return (
    <form
      className='w-full flex flex-col gap-6 py-4 overflow-y-scroll h-full'
      onSubmit={updateHorsemanshipScorecard}>
      <div className='flex justify-start items-start gap-4'>
        {/* Rider General Info */}
        <div className='flex flex-col'>
          <InputLabel htmlFor={'riderName'}>Rider Name</InputLabel>
          <div className='mt-1'>
            <Input
              id={'riderName'}
              name={'riderName'}
              type='string'
              value={editedContestant?.riderName || ''}
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
              value={editedContestant?.riderNumber || ''}
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
              initialValue={editedContestant?.type || RiderTypes[0].name}
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
              initialValue={editedContestant?.class || RiderClass[0].name}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <InputLabel htmlFor={'division'}>Division</InputLabel>
          <div className='mt-1'>
            <ListboxSelect
              name={'division'}
              options={RiderDivision}
              onChange={(e) => handleListbox(e, 'division')}
              initialValue={editedContestant?.division || RiderDivision[0].name}
            />
          </div>
        </div>
      </div>
      {/* Rider General Inputs */}
      <div className='flex flex-col justify-start items-start gap-4'>
        {/* Tack & Equipment */}
        <TextArea
          htmlFor={'tackAndEquipment'}
          label={'Tack & Equipment'}
          subText='Cleanliness, proper fit, adjustment, repair, trail gear replacement
            & security'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.general
              .tackAndEquipment || ''
          }
          onChange={handleGeneral}
        />
        {/* Grooming */}
        <TextArea
          htmlFor={'grooming'}
          label={'Grooming'}
          subText='Brushing, Dirt, Sweat Marks, External Parasites, Feet & Shoeing'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.general
              .grooming || ''
          }
          onChange={handleGeneral}
        />

        {/* In-Hand Presentation */}
        <TextArea
          htmlFor={'inHandPresentation'}
          label={'In-Hand Presentation'}
          subText='Safety, Turning, Lead Rope, Consideration of Others, Response to
            Directions, Teamwork (TW)'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.general
              .inHandPresentation || ''
          }
          onChange={handleGeneral}
        />

        {/* General Score */}
        <div className='flex justify-end items-center gap-4 w-fit ml-auto'>
          <InputLabel htmlFor={'generalScore'}>Total Score:</InputLabel>
          <Input
            id={'generalScore'}
            name={'generalScore'}
            type='string'
            value={
              editedContestant?.horsemanshipScorecard?.qualifiers.general
                .generalScore || ''
            }
            onChange={handleGeneral}
            className='max-w-[4.5rem] text-center'
            max={20}
          />
          <span className='text-sm font-medium text-gray-700'>/ 20</span>
        </div>
      </div>
      {/* Rider Form Inputs */}
      <div className='flex flex-col justify-start items-start gap-4'>
        {/* Trail Equitation */}
        <TextArea
          htmlFor={'trailEquitation'}
          label={'Trail Equitation'}
          subText='Ascending, Descending, & Level Terrain: Balance & Lightness of Seat, Cues, Body & Leg Position, Control, Hands & Aids to Horse; Mounting & Dismounting; Obstacles: Control, Cues, Timing, Form; Teamwork (TW)'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.form
              .trailEquitation || ''
          }
          onChange={handleForm}
        />

        {/* Form Score */}
        <div className='flex justify-end items-center gap-4 w-fit ml-auto'>
          <InputLabel htmlFor={'formScore'}>Total Score:</InputLabel>
          <Input
            id={'formScore'}
            name={'formScore'}
            type='string'
            value={
              editedContestant?.horsemanshipScorecard?.qualifiers.form
                .formScore || ''
            }
            onChange={handleForm}
            className='max-w-[4.5rem] text-center'
            max={50}
          />
          <span className='text-sm font-medium text-gray-700'>/ 50</span>
        </div>
      </div>
      {/* Rider Trail Inputs */}
      <div className='flex flex-col justify-start items-start gap-4'>
        {/* Trail Safety & Courtesy */}
        <TextArea
          htmlFor={'trailSafetyAndCourtesy'}
          label={'Trail Safety & Courtesy'}
          subText='Crowding; Riding in a Bunch; Response to directions; potential danger to horse, self & others; consideration of others'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.trail
              .trailSafetyAndCourtesy || ''
          }
          onChange={handleTrail}
        />
        {/* Stabling */}
        <TextArea
          htmlFor={'stabling'}
          label={'Stabling'}
          subText='Horse Care, Safety, Feed & Water Container, Tie (height, Length, Quick Release Knot & Security), Blanket,Ttack & Gear Storage, Choice of Parking Location'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.trail
              .stabling || ''
          }
          onChange={handleTrail}
        />
        {/* Trail Care */}
        <TextArea
          htmlFor={'trailCare'}
          label={'Trail Care'}
          subText='cinch, saddle, blanket, pad, feet, water stops, tie & safety, pacing & timing, cooling out'
          value={
            editedContestant?.horsemanshipScorecard?.qualifiers.trail
              .trailCare || ''
          }
          onChange={handleTrail}
        />

        {/* Trail Score */}
        <div className='flex justify-end items-center gap-4 w-fit ml-auto'>
          <InputLabel htmlFor={'trailScore'}>Total Score:</InputLabel>
          <Input
            id={'trailScore'}
            name={'trailScore'}
            type='string'
            value={
              editedContestant?.horsemanshipScorecard?.qualifiers.trail
                .trailScore || ''
            }
            onChange={handleTrail}
            className='max-w-[4.5rem] text-center'
            max={30}
          />
          <span className='text-sm font-medium text-gray-700'>/ 30</span>
        </div>
      </div>

      {/* Penalty Section */}
      <div className='flex justify-start items-start gap-4'>
        {/* Rider General Info */}
        <div className='flex flex-col w-full max-w-[6rem]'>
          <InputLabel htmlFor={'penaltyPoints'}>Penalty Points</InputLabel>
          <div className='mt-1 w-full'>
            <Input
              id={'penaltyPoints'}
              name={'penaltyPoints'}
              type='string'
              value={
                editedContestant?.horsemanshipScorecard?.penalty
                  ?.penaltyPoints ?? 0
              }
              onChange={handlePenalty}
            />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <InputLabel htmlFor={'penaltyPointExplanation'}>
            Penalty Point Explanation
          </InputLabel>
          <div className='mt-1'>
            <Input
              id={'penaltyPointExplanation'}
              name={'penaltyPointExplanation'}
              type='string'
              value={
                editedContestant?.horsemanshipScorecard?.penalty
                  ?.penaltyPointExplanation || ''
              }
              onChange={handlePenalty}
            />
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className='flex justify-end items-center gap-4 w-fit ml-auto'>
        <InputLabel htmlFor={'overallScore'}>Overall Score:</InputLabel>

        <Input
          id={'overallScore'}
          name={'overallScore'}
          type='string'
          value={overallScore() ?? ''}
          onChange={handleOverall}
          className='max-w-[4rem] text-center'
          max={30}
          readOnly
          disabled
        />
      </div>

      <div className='flex justify-end mb-8 gap-4'>
        <Button
          secondary
          color='[#FF0000]'
          className='ml-auto'
          onClick={deleteContestant}>
          Remove Rider From This Event
        </Button>
        <Button primary color='primary' className='ml-auto' type='submit'>
          {saving ? 'Saving' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
};

export default HorsemanshipScorecard;
