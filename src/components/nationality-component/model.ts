import * as Yup from 'yup';

export class NationalityData {
  constructor(
    readonly countryOfBirth: string,
    readonly nationality: string,
    readonly placeOfBirth: string,
    readonly isCitizen?: string
  ) {}

  static empty(countryOfBirth?: string, nationality?: string,placeOfBirth?:string): NationalityData {
    return new NationalityData(countryOfBirth ?? '', nationality ?? '', placeOfBirth ?? '');
  }
}

export const NationalityDataSchema = () =>
  Yup.object().shape({
    countryOfBirth: Yup.string().trim().required('Enter place of birth'),
    nationality: Yup.string().trim().required('Select nationality'),
    placeOfBirth: Yup.string().trim().required('Select province'),
    isCitizen: Yup.string().required(),
  });
