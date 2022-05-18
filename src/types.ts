import { AddressDetailsData } from "./components/address-detail-component/model";
import { NationalityData } from "./components/nationality-component/model";
import { MainDetailsData } from "./components/main-detail-component/model";
import { OtherDetailsData } from "./components/other-details-component/model";
import { AccountDetailsData } from "./components/account-details-component/model";

export interface InitCustomerInvokeData {
  firstName?: string;
  lastName?: string;
  defaultStep?: string;
}

export interface CountryInformation {
  id: number;
  type: string;
  attributes: {
    code3: string;
    code2: string;
    name: string;
    capitalCity: string;
    flagUrlRect: string;
    flagUrlRound: string;
    idd: string;
    active: boolean;
    region: string;
    currencyInfo: {
      listCurrency: Currency[];
    };
  };
}

export interface Currency {
  name: string;
  code: string;
  symbol: string;
  decimals: number;
  displaySymbol: string;
  displayFormat: string;
  displaySymbolFirst: boolean;
  isoCode: string;
  displaySpace: number;
  logo?: string;
}

export type GroupNationality = {
  section: string;
  items: Nationality[];
};

export type GroupCountry = {
  section: string;
  items: CountryInformation[];
};

export type Nationality = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type Region = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupRegion = {
  section: string;
  items: Region[];
};

export type Occupation = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupOccupation = {
  section: string;
  items: Occupation[];
};

export type Province = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupProvince = {
  section: string;
  items: Province[];
};

export type City = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupCity = {
  section: string;
  items: City[];
};

export type NatureWork = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupNatureWork = {
  section: string;
  items: NatureWork[];
};

export type Barangay = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupBarangay = {
  section: string;
  items: Barangay[];
};

export type StepData = {
  id: string;
  title: string;
  subTitle?: string;
  progress: number;
};

export type CustomerInvokeData = {
  mainDetails?: MainDetailsData;
  nationalityDetails?: NationalityData;
  addresses?: AddressDetailsData[];
  otherDetails?: OtherDetailsData;
  accountDetails?: AccountDetailsData;
};

export interface Profile {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  status: string;
  lastLoginAt: string;
  country: CountryInformation;
}

export interface AddressParams {
  addressType: string;
  line1: string;
  line2: string;
  line3: string;
  buildingName: string;
  buildingNumber: string;
  apartmentName: string;
  city: string;
  county: string;
  region: string;
  province: string;
  postcode: string;
}

export interface EmploymentDetailParams {
  status: string;
  designation: string;
  companyType: string;
  companyName: string;
  tradingSince: string;
  addresses: { addressType: string; city: string; postcode: string }[];
}

export interface ApplicationDetailsParams {
  firstName: string;
  lastName: string;
  middleName: string;
  maritalStatus: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  citizenFlag: boolean;
  presentAsPermAddressFlag: boolean;
  contactDetails: { contactType: string; contactValue: string }[];
  addresses: AddressParams[];
  listCustomFields: {
    customKey: string;
    customValue: string;
  }[];
}

export interface EmploymentDetails {
  status: string;
  designation: string;
  companyType: string;
  companyName: string;
  addresses: { city: string; postcode: string }[];
}

export interface Credit {
  applicant: CreditApplicant;
}

export interface CreditApplicant {
  individual: CreditIndividual;
}

export interface CreditIndividual {
  sourceOfFund: string;
  accountPurpose: string;
  minMonthlyIncome?: number;
  maxMonthlyIncome?: number;
  currency: string;
}

export interface CreateApplicationParams {
  submitType: string;
  applicantDetails: ApplicationDetailsParams;
  employmentDetails: EmploymentDetails[];
  credit: Credit;
  customFields: {
    customKey: string;
    customValue: string;
  }[];
}

export interface ValidateMainDetailParam {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
  contacts: {
    contactType: string;
    contactValue: string;
    isPrimary: boolean;
  }[];
  listCustomFields: {
    customKey: string;
    customValue: string;
  }[];
}

export interface MainDetailParam {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
  contacts: {
    contactType: string;
    contactValue: string;
    isPrimary: boolean;
  }[];
  listCustomFields: {
    customKey: string;
    customValue: string;
  }[];
}

export interface NationalityParam {
  placeOfBirth: string;
  nationality: string;
  countryOfBirth: string;
  isCitizen: boolean;
  listCustomFields: {
    customKey: string;
    customValue: string;
  }[];
}

export interface ApplicationDetails {
  applicationId: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface ApplicationListData {
  applicationId: string;
  userId: string;
  status: string;
  createdAt: string;
  applicantDetails: {
    firstName: string;
    lastName: string;
    middleName: string;
    gender: string;
    dateOfBirth: string;
    placeOfBirth: string;
    maritalStatus: string;
    nationality: string;
    citizenFlag: boolean;
    presentAsPermAddressFlag: boolean;
    contactDetails: {
      id: string;
      contactType: string;
      contactValue: string;
    }[];
    addresses: AddressParams[];
  };
  employmentDetails: {
    id: string;
    companyName: string;
    companyType: string;
    designation: string;
    status: string;
    createdAt: string;
    contactDetails: [];
    addresses: {
      id: string;
      city: string;
      postcode: string;
    }[];
  }[];
  guarantors: [];
  credit: {
    applicant: {
      individual: {
        minMonthlyIncome: number;
        maxMonthlyIncome: number;
        sourceOfFund: string;
        accountPurpose: string;
        creditCards: {
          numberOfCC: number;
        };
        loans: {
          numberOfLoans: number;
        };
      };
    };
  };
  customFields: {
    id: string;
    customKey: string;
    customValue: string;
  }[];
}

export type GroupCountryList = {
  section: string;
  items: CountryListData[];
};

export interface CountryListData {
      id: number,
      active: boolean,
      capitalCity: string,
      code2: string,
      code3: string,
      currencyInfo: {
        listCurrency: [
          {
            code: string,
            displayFormat: string,
            displaySpace: number,
            displaySymbol: string,
            displaySymbolFirst: boolean,
            isPrimary: boolean,
            isoCode: string,
            name: string,
            symbol:string,
          }
        ]
      },
      idd:string,
      name: string,
      region: string,

}


export type GroupProvinceList = {
  section: string;
  items: ProvinceListData[];
};

export interface ProvinceListData {
    id: string,
    parentLocationId: string,
    countryId:string,
    locationLevel: number,
    locationName: string,
}

export interface ProvincePagingData {
  pageNumber: number,
  pageSize: number,
  totalRecords: number
}


export type GroupLocationList = {
  section: string;
  items: LocationListData[];
};

export interface LocationListData {
    id: string,
    parentLocationId: string,
    countryId:string,
    locationLevel: number,
    locationName: string,
}

export interface LocationPagingData {
  pageNumber: number,
  pageSize: number,
  totalRecords: number
}
