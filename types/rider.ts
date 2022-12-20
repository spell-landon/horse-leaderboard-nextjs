export interface RiderProps {
  class: string;
  division: string;
  horseAge: string;
  horseBreed: string;
  horseName: string;
  riderName: string;
  riderNumber: string;
  type: string;
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
