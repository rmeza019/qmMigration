import { ISRCase } from 'app/shared/model/sr-case.model';

export interface IEngineer {
  id?: number;
  engMail?: string;
  engName?: string;
  engLastName?: string;
  cases?: ISRCase[];
}

export class Engineer implements IEngineer {
  constructor(
    public id?: number,
    public engMail?: string,
    public engName?: string,
    public engLastName?: string,
    public cases?: ISRCase[]
  ) {}
}
