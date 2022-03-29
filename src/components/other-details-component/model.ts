import * as Yup from 'yup';

export class OtherDetailsData {
  constructor(
    readonly status: string,
    readonly occupation: string,
    readonly companyType: string,
    readonly companyName: string,
    readonly city: string,
    readonly postcode: string
  ) {}

  static empty(): OtherDetailsData {
    return new OtherDetailsData('', '', '', '', '', '');
  }
}

export const OtherDetailsSchema = () =>
  Yup.object().shape({
    status: Yup.string().trim().required('Select employment status'),
    occupation: Yup.string().trim().required('Select occupation'),
    companyType: Yup.string().trim().required('Select nature of work / business'),
    companyName: Yup.string().trim().required('Enter business address'),
    city: Yup.string().trim().required('Select city'),
    postcode: Yup.string().trim().required('Enter ZIP Code'),
  });
