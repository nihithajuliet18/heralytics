import { CrimeCase } from '../../types';
import { case01 } from './case01';
import { case02 } from './case02';
import { case03 } from './case03';
import { case04 } from './case04';
import { case05 } from './case05';
import { case06 } from './case06';
import { case07 } from './case07';
import { case08 } from './case08';
import { case09 } from './case09';
import { case10 } from './case10';

export const ALL_CASES: CrimeCase[] = [
  case01,
  case02,
  case03,
  case04,
  case05,
  case06,
  case07,
  case08,
  case09,
  case10
];

export const getCaseById = (id: string): CrimeCase | undefined => {
  return ALL_CASES.find((c) => c.id === id);
};

export const getCaseByIndex = (index: number): CrimeCase | undefined => {
  return ALL_CASES[index];
};
