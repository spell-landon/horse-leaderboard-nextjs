export interface ReferenceProps {
  _key?: string;
  _ref: string;
  _type: string;
}

export interface EventProps {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  endDate: string;
  judges: {
    hsp: string[];
    vet: string[];
  };
  name: string;
  region: string;
  riders: ReferenceProps[] | RiderProps[];
  slug: {
    _type: 'slug' | string;
    current: string;
  };
  startDate: string;
  _updatedAt: string;
}
export interface RiderProps {
  _key?: string;
  _createdA: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  class: string;
  division: string;
  horseAge: string;
  horseBreed: string;
  horseName: string;
  horsemanshipScorecard: HorsemanshipScorecardProps | ReferenceProps;
  riderName: string;
  riderNumber: string;
  type: string;
}

export interface HorsemanshipScorecardProps {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  overallScore: string;
  penalty: {
    penaltyPointExplanation: string;
    penaltyPoints: string;
  };
  qualifiers: {
    form: {
      formScore: string;
      trailEquitation: string;
    };
    general: {
      generalScore: string;
      grooming: string;
      inHandPresentation: string;
      tackAndEquipment: string;
    };
    trail: {
      stabling: string;
      trailCare: string;
      trailSafetyAndCourtesy: string;
      trailScore: string;
    };
  };
  riderName: ReferenceProps | RiderProps;
  scoreSubtotal: string;
}

export const RiderTypes = [
  { id: 1, name: 'AA' },
  { id: 2, name: 'A' },
  { id: 3, name: 'B1' },
  { id: 4, name: 'B2' },
];

export const RiderDivision = [
  { id: 1, name: 'Open' },
  { id: 2, name: 'CP' },
  { id: 3, name: 'Nov' },
];

export const RiderClass = [
  { id: 1, name: 'HWT' },
  { id: 2, name: 'LWT' },
  { id: 3, name: 'JR' },
];
