import * as Yup from 'yup';

export class AccountDetailsData {
  constructor(
    readonly sourceOfFund: string,
    readonly accountPurpose: string,
    readonly monthlyIncome: string
  ) {}

  static empty(): AccountDetailsData {
    return new AccountDetailsData('', '', '');
  }
}

export const AccountDetailsSchema = () =>
  Yup.object().shape({
    sourceOfFund: Yup.string().trim().required('Select source of funds'),
    accountPurpose: Yup.string().trim().required('Select account purpose'),
    monthlyIncome: Yup.string().trim().required('Select estimated monthly transaction'),
  });
