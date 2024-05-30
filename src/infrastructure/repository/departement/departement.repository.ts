import { Injectable } from '@nestjs/common';
import insee_liste from './correspondance-code-insee-code-postal.json';

export type InseeEntry = {
  'Code Postal': string;
  'Code Département': string;
};

@Injectable()
export class DepartementRepository {
  constructor() {}

  findDepartementRegionByCodePostal(code_postal: string): {
    code_departement: string;
    code_region: string;
  } {
    const code_postal_court = code_postal.startsWith('0')
      ? code_postal.substr(1, 4)
      : code_postal;

    const found = (insee_liste as Array<InseeEntry>).find(
      (entry) =>
        entry['Code Postal'].includes(code_postal) ||
        entry['Code Postal'] === code_postal_court,
    );
    if (found) {
      return {
        code_departement: found['Code Département'],
        code_region: found['Code Région'],
      };
    } else {
      return undefined;
    }
  }
}
