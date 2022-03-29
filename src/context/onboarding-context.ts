import moment from 'moment';
import { AccountDetailsData } from './../components/account-details-component/model';
import { OtherDetailsData } from './../components/other-details-component/model';
import React, { useCallback, useMemo, useState } from 'react';
import { AddressDetailsData } from '../components/address-detail-component/model';
import { MainDetailsData } from '../components/main-detail-component/model';
import { NationalityData } from '../components/nationality-component/model';
import { OnboardingService } from '../service/onboarding-service';
import { OnboardingData, Profile, ApplicationDetails } from '../types';

const onboardingService = OnboardingService.instance();

export interface OnboardingContextData {
  data: OnboardingData;
  setOnboardingData: (data: OnboardingData) => void;
  isLoadingProfile: boolean;
  profile?: Profile;
  errorLoadProfile?: Error;
  getUserProfile: () => void;
  setUserProfile: (profile: Profile) => void;
  isUpdatingMainDetails: boolean;
  isUpdatedMainDetails: boolean;
  updateMainDetails: (params: MainDetailsData) => void;
  errorUpdateMainDetails?: Error;
  isUpdatingNationality: boolean;
  isUpdatedNationality: boolean;
  updateNationality: (params: NationalityData) => void;
  errorUpdateNationality?: Error;
  isUpdatingAddressDetails: boolean;
  isUpdatedAddressDetails: boolean;
  updateAddressDetails: (isPresentAsPermAddress: boolean, addresses: AddressDetailsData[]) => void;
  errorUpdateAddressDetails?: Error;
  clearErrors: () => void;
  updateOtherDetails: (params: OtherDetailsData) => void;
  updateAccountDetails: (params: AccountDetailsData) => void;
  clearData: () => void;
  isCreatingApplication: boolean;
  isCreatedApplication: boolean;
  createApplication: (minIncome?: number, maxIncome?: number) => void;
  errorCreateApplication?: Error;
  isUpdatedOtherDetails: boolean;
  isUpdatedAccountDetails: boolean;
  applicationDetails?: ApplicationDetails;
}

export const onboardingDefaultValue: OnboardingContextData = {
  data: {},
  setOnboardingData: () => null,
  isLoadingProfile: false,
  isUpdatingAddressDetails: false,
  isUpdatingMainDetails: false,
  isUpdatingNationality: false,
  updateMainDetails: () => null,
  updateNationality: () => null,
  getUserProfile: () => null,
  updateAddressDetails: () => null,
  clearErrors: () => null,
  setUserProfile: () => null,
  isUpdatedAddressDetails: false,
  isUpdatedMainDetails: false,
  isUpdatedNationality: false,
  updateOtherDetails: () => null,
  updateAccountDetails: () => null,
  clearData: () => null,
  createApplication: () => null,
  isCreatingApplication: false,
  isCreatedApplication: false,
  isUpdatedAccountDetails: false,
  isUpdatedOtherDetails: false,
};

export const OnboardingContext = React.createContext<OnboardingContextData>(onboardingDefaultValue);

export function useOnboardingContextValue(): OnboardingContextData {
  const [_data, setData] = useState<OnboardingData>({});

  const [_profile, setProfile] = useState<Profile | undefined>(undefined);
  const [_isLoadingProfile, setLoadingProfile] = useState(false);
  const [_errorLoadProfile, setErrorLoadProfile] = useState<Error | undefined>(undefined);

  const [_isUpdatingMainDetails, setUpdatingMainDetails] = useState(false);
  const [_isUpdatedMainDetails, setUpdatedMainDetails] = useState(false);
  const [_errorUpdateMainDetails, setErrorUpdateMainDetails] = useState<Error | undefined>(
    undefined
  );

  const [_isUpdatingNationality, setUpdatingNationality] = useState(false);
  const [_isUpdatedNationality, setUpdatedNationality] = useState(false);
  const [_errorUpdateNationality, setErrorUpdateNationality] = useState<Error | undefined>(
    undefined
  );

  const [_isUpdatingAddressDetails, setUpdatingAddressDetails] = useState(false);
  const [_isUpdatedAddressDetails, setUpdatedAddressDetails] = useState(false);
  const [_errorUpdateAddressDetails, setErrorUpdateAddressDetails] = useState<Error | undefined>(
    undefined
  );

  const [_isCreatingApplication, setCreatingApplication] = useState(false);
  const [_isCreatedApplication, setCreatedApplication] = useState(false);
  const [_errorCreateApplication, setErrorCreateApplication] = useState<Error | undefined>(
    undefined
  );
  const [_isUpdatedOtherDetails, setUpdatedOtherDetails] = useState(false);
  const [_isUpdatedAccountDetails, setUpdatedAccountDetails] = useState(false);
  const [_applicationDetails, setApplicationDetails] = useState<ApplicationDetails | undefined>(
    undefined
  );

  const getUserProfile = useCallback(async () => {
    try {
      setLoadingProfile(true);
      const { data } = await onboardingService.getProfile();
      setProfile(data);
      setLoadingProfile(false);
    } catch (error) {
      setLoadingProfile(false);
      setErrorLoadProfile(error as Error);
    }
  }, []);

  const clearErrors = useCallback(() => {
    if (_errorLoadProfile) {
      setErrorLoadProfile(undefined);
    }
    if (_errorUpdateMainDetails) {
      setErrorUpdateMainDetails(undefined);
    }
    if (_errorUpdateAddressDetails) {
      setErrorUpdateAddressDetails(undefined);
    }
    if (_errorCreateApplication) {
      setErrorCreateApplication(undefined);
    }
  }, [
    _errorLoadProfile,
    _errorUpdateMainDetails,
    _errorUpdateNationality,
    _errorUpdateAddressDetails,
    _errorCreateApplication,
  ]);

  const updateMainDetails = useCallback(
    async (params: MainDetailsData) => {
      try {
        setUpdatingMainDetails(true);
        await onboardingService.updateMainDetails(_profile?.userId!, {
          ...params,
          dateOfBirth: moment(params.dateOfBirth, 'DD / MM / YYYY').format('YYYY-MM-DD'),
          contacts: params.email
            ? [
                {
                  contactType: 'EMAIL',
                  contactValue: params.email,
                  isPrimary: true,
                },
              ]
            : [],
        });
        setData({
          ..._data,
          mainDetails: params,
        });
        setUpdatedMainDetails(true);
        setTimeout(() => {
          setUpdatedMainDetails(false);
        }, 50);
        setUpdatingMainDetails(false);
      } catch (error) {
        setUpdatingMainDetails(false);
        setErrorUpdateMainDetails(error as Error);
      }
    },
    [_data, _profile]
  );

  const updateNationality = useCallback(
    async (params: NationalityData) => {
      try {
        setUpdatingNationality(true);
        await onboardingService.updateNationalityDetails(_profile?.userId!, {
          ...params,
          isCitizen: params.isCitizen === 'yes',
        });
        setData({
          ..._data,
          nationalityDetails: params,
        });
        setUpdatedNationality(true);
        setTimeout(() => {
          setUpdatedNationality(false);
        }, 50);
        setUpdatingNationality(false);
      } catch (error) {
        setUpdatingNationality(false);
        setErrorUpdateNationality(error as Error);
      }
    },
    [_data, _profile]
  );

  const updateAddressDetails = useCallback(
    async (isPresentAsPermAddress: boolean, addresses: AddressDetailsData[]) => {
      try {
        setUpdatingAddressDetails(true);
        await onboardingService.updateAddressDetails(
          _profile?.userId!,
          isPresentAsPermAddress,
          addresses.map((address) => ({
            ...address,
            addressType: address.addressType === 1 ? 'Resident' : 'Permanent',
            buildingNumber: '-',
            apartmentName: '-',
            county: '-',
          }))
        );
        setData({
          ..._data,
          addresses,
        });
        setUpdatedAddressDetails(true);
        setTimeout(() => {
          setUpdatedAddressDetails(false);
        }, 50);
        setUpdatingAddressDetails(false);
      } catch (error) {
        setUpdatingAddressDetails(false);
        setErrorUpdateAddressDetails(error as Error);
      }
    },
    [_data, _profile]
  );

  const setUserProfile = useCallback((profile: Profile) => {
    setProfile(profile);
  }, []);

  const setOnboardingData = useCallback((data: OnboardingData) => {
    setOnboardingData(data);
  }, []);

  const updateAccountDetails = useCallback(
    (params: AccountDetailsData) => {
      setData({
        ..._data,
        accountDetails: params,
      });
      setUpdatedAccountDetails(true);
      setTimeout(() => {
        setUpdatedAccountDetails(false);
      }, 50);
    },
    [_data]
  );

  const updateOtherDetails = useCallback(
    (params: OtherDetailsData) => {
      setData({
        ..._data,
        otherDetails: params,
      });
      setUpdatedOtherDetails(true);
      setTimeout(() => {
        setUpdatedOtherDetails(false);
      }, 50);
    },
    [_data]
  );

  const clearData = useCallback(() => {
    setData({});
    setApplicationDetails(undefined);
  }, []);

  const createApplication = useCallback(
    async (minIncome?: number, maxIncome?: number) => {
      try {
        if (
          !_data.mainDetails ||
          !_data.addresses ||
          !_data.nationalityDetails ||
          !_data.accountDetails ||
          !_data.otherDetails
        ) {
          setErrorCreateApplication(new Error('Missing parameters'));
          return;
        }
        setCreatingApplication(true);
        const { data } = await onboardingService.createApplication({
          submitType: 'Submit',
          applicantDetails: {
            firstName: _data.mainDetails.firstName ?? '',
            lastName: _data.mainDetails.lastName ?? '',
            middleName: _data.mainDetails.middleName ?? '',
            dateOfBirth:
              moment(_data.mainDetails?.dateOfBirth, 'DD / MM / YYYY').format('YYYY-MM-DD') ?? '',
            maritalStatus: _data.mainDetails.maritalStatus ?? '',
            gender: _data.mainDetails.gender ?? '',
            contactDetails: _data.mainDetails.email
              ? [
                  {
                    contactType: 'Email',
                    contactValue: _data.mainDetails?.email!,
                  },
                ]
              : [],
            placeOfBirth: _data.nationalityDetails.placeOfBirth,
            nationality: _data.nationalityDetails.nationality,
            citizenFlag: _data.nationalityDetails?.isCitizen === 'yes',
            presentAsPermAddressFlag: _data.addresses?.length === 1,
            addresses:
              _data.addresses?.map((address) => ({
                ...address,
                addressType: address.addressType === 1 ? 'Resident' : 'Permanent',
                buildingNumber: '-',
                apartmentName: '-',
                county: '-',
              })) ?? [],
          },
          employmentDetails: {
            status: _data.otherDetails.status ?? '',
            companyName: _data.otherDetails.companyName ?? '',
            companyType: _data.otherDetails.companyType ?? '',
            addresses: [{ ..._data.otherDetails }],
            designation: _data.otherDetails.occupation,
          },
          credit: {
            applicant: {
              individual: {
                accountPurpose: _data.accountDetails.accountPurpose,
                sourceOfFund: _data.accountDetails.sourceOfFund,
                currency: 'PHP',
                maxMonthlyIncome: maxIncome,
                minMonthlyIncome: minIncome,
              },
            },
          },
        });
        setApplicationDetails({
          applicationId: data.applicationId,
          firstName: data.applicantDetails.firstName,
          lastName: data.applicantDetails.lastName,
          middleName: data.applicantDetails.middleName,
        });
        setCreatedApplication(true);
        setTimeout(() => {
          setCreatedApplication(false);
        }, 50);
        setCreatingApplication(false);
      } catch (error) {
        setCreatingApplication(false);
        setErrorCreateApplication(error as Error);
      }
    },
    [_data]
  );

  return useMemo(
    () => ({
      getUserProfile,
      clearErrors,
      profile: _profile,
      isLoadingProfile: _isLoadingProfile,
      errorLoadProfile: _errorLoadProfile,
      updateMainDetails,
      isUpdatingMainDetails: _isUpdatingMainDetails,
      errorUpdateMainDetails: _errorUpdateMainDetails,
      updateNationality,
      isUpdatingNationality: _isUpdatingNationality,
      errorUpdateNationality: _errorUpdateNationality,
      updateAddressDetails,
      isUpdatingAddressDetails: _isUpdatingAddressDetails,
      errorUpdateAddressDetails: _errorUpdateAddressDetails,
      setUserProfile,
      isUpdatedAddressDetails: _isUpdatedAddressDetails,
      isUpdatedMainDetails: _isUpdatedMainDetails,
      isUpdatedNationality: _isUpdatedNationality,
      setOnboardingData,
      data: _data,
      updateAccountDetails,
      updateOtherDetails,
      clearData,
      createApplication,
      isCreatedApplication: _isCreatedApplication,
      isCreatingApplication: _isCreatingApplication,
      errorCreateApplication: _errorCreateApplication,
      isUpdatedAccountDetails: _isUpdatedAccountDetails,
      isUpdatedOtherDetails: _isUpdatedOtherDetails,
      applicationDetails: _applicationDetails,
    }),
    [
      _applicationDetails,
      _data,
      _isUpdatedOtherDetails,
      _isUpdatedAccountDetails,
      _isCreatedApplication,
      _isCreatingApplication,
      _errorCreateApplication,
      _isUpdatedNationality,
      _isUpdatedMainDetails,
      _isUpdatedAddressDetails,
      _profile,
      _isLoadingProfile,
      _errorLoadProfile,
      _isUpdatingMainDetails,
      _errorUpdateMainDetails,
      _isUpdatingNationality,
      _errorUpdateNationality,
      _isUpdatingAddressDetails,
      _errorUpdateAddressDetails,
    ]
  );
}
