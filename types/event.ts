export interface EventProps {
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
