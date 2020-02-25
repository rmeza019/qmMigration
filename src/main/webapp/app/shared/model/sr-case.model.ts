import { IEngineer } from 'app/shared/model/engineer.model';

export interface ISRCase {
  id?: number;
  srNumber?: number;
  severity?: string;
  type?: string;
  caseOwner?: IEngineer;
}

export class SRCase implements ISRCase {
  constructor(public id?: number, public srNumber?: number, public severity?: string, public type?: string, public caseOwner?: IEngineer) {}
}
