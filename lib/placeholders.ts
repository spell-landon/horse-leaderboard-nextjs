export const CONTESTANTS = [
  {
    name: 'Cara Liebman',
    number: 63,
    horse: 'Flash Black',
    riderScore: 97,
    horseScore: 90,
    position: 1,
  },
  {
    name: 'David Spell',
    number: 64,
    horse: 'Gage',
    riderScore: 96,
    horseScore: 89,
    position: 2,
  },
  {
    name: 'John Smith',
    number: 23,
    horse: 'Alfonso',
    riderScore: 80,
    horseScore: 79,
    position: 3,
  },
];

export const VET_JUDGES = [
  {
    name: 'Lindsay Walton',
    role: 'vet_judge',
  },
  {
    name: 'Sam Bass',
    role: 'vet_judge',
  },
];
export const HSP_JUDGES = [
  {
    name: 'Jennifer Fallin',
    role: 'hsp_judge',
  },
  {
    name: 'Josh Applin',
    role: 'hsp_judge',
  },
];

export const RIDE_OBJECT = {
  name: 'Bell Cow Rendezvous',
  startDate: 'November 2, 2019',
  endDate: 'November 3, 2019',
  region: '4',
  judges: {
    vetJudges: VET_JUDGES,
    hspJudges: HSP_JUDGES,
  },
  contestants: CONTESTANTS,
};
