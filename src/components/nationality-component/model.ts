import * as Yup from 'yup';

export class NationalityData {
  constructor(
    readonly placeOfBirth: string,
    readonly nationality: string,
    readonly isCitizen?: string
  ) {}

  static empty(placeOfBirth?: string, nationality?: string): NationalityData {
    return new NationalityData(placeOfBirth ?? '', nationality ?? '');
  }
}

export const NationalityDataSchema = () =>
  Yup.object().shape({
    placeOfBirth: Yup.string().trim().required('Enter place of birth'),
    nationality: Yup.string().trim().required('Select nationality'),
    isCitizen: Yup.string().required(),
  });
