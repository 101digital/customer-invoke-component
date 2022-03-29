import * as Yup from 'yup';

export class AddressDetailsData {
  constructor(
    readonly addressType: number,
    readonly line1: string, // House
    readonly line2: string, // Street name
    readonly line3: string, // Barangay
    readonly country: string,
    readonly postcode: string,
    readonly province: string,
    readonly region: string,
    readonly buildingName: string, // Village,
    readonly city: string //city
  ) {}

  static empty(addressType: number): AddressDetailsData {
    return new AddressDetailsData(addressType, '', '', '', '', '', '', '', '', '');
  }
}

export const AddressDetailsSchema = () =>
  Yup.object().shape({
    addresses: Yup.array().of(
      Yup.object().shape({
        addressType: Yup.number().required(),
        line3: Yup.string().required('Select Barangay'),
        country: Yup.string().required('Select Country'),
        postcode: Yup.string().required('ZIP Code'),
        province: Yup.string().required('Select Province'),
        region: Yup.string().required('Select Region'),
        city: Yup.string().required('Select City'),
      })
    ),
  });
