import moment from "moment";
import { AccountDetailsData } from "./../components/account-details-component/model";
import { OtherDetailsData } from "./../components/other-details-component/model";
import React, { useCallback, useMemo, useState } from "react";
import { AddressDetailsData } from "../components/address-detail-component/model";
import { MainDetailsData } from "../components/main-detail-component/model";
import { NationalityData } from "../components/nationality-component/model";
import { CustomerInvokeService } from "../service/onboarding-service";
import {
  CustomerInvokeData,
  Profile,
  ApplicationDetails,
  ApplicationListData
} from "../types";

const onboardingService = CustomerInvokeService.instance();

export interface CustomerInvokeContextData {
  data: CustomerInvokeData;
  setCustomerInvokeData: (data: CustomerInvokeData) => void;
  isLoadingProfile: boolean;
  profile?: Profile;
  errorLoadProfile?: Error;
  getUserProfile: () => void;
  setUserProfile: (profile: Profile) => void;
  updateProfile: (profile: any) => void;
  isUpdatingMainDetails: boolean;
  isUpdatedMainDetails: boolean;
  addMainDetails: (params: MainDetailsData) => void;
  errorAddMainDetails?: Error;
  isInValidateUser?: boolean;
  isUpdatingNationality: boolean;
  isUpdatedNationality: boolean;
  updateNationality: (params: NationalityData) => void;
  errorUpdateNationality?: Error;
  isUpdatingAddressDetails: boolean;
  isUpdatedAddressDetails: boolean;
  updateAddressDetails: (
    isPresentAsPermAddress: boolean,
    addresses: AddressDetailsData[]
  ) => void;
  errorUpdateAddressDetails?: Error;
  clearErrors: () => void;
  updateOtherDetails: (params: OtherDetailsData) => void;
  updateAccountDetails: (params: AccountDetailsData) => void;
  clearData: () => void;
  isCreatingApplication: boolean;
  isGetApplicationList: boolean;
  isCreatedApplication: boolean;
  createApplication: (minIncome?: number, maxIncome?: number) => void;
  getApplicationList: () => void;
  errorCreateApplication?: Error;
  errorGetApplicationList?: Error;
  isUpdatedOtherDetails: boolean;
  isUpdatedAccountDetails: boolean;
  applicationDetails?: ApplicationDetails;
  applicationList?: ApplicationListData;
}

export const onboardingDefaultValue: CustomerInvokeContextData = {
  data: {},
  setCustomerInvokeData: () => null,
  isLoadingProfile: false,
  isUpdatingAddressDetails: false,
  isUpdatingMainDetails: false,
  isUpdatingNationality: false,
  addMainDetails: () => null,
  updateNationality: () => null,
  getUserProfile: () => null,
  updateAddressDetails: () => null,
  clearErrors: () => null,
  setUserProfile: () => null,
  updateProfile: () => null,
  isUpdatedAddressDetails: false,
  isUpdatedMainDetails: false,
  isUpdatedNationality: false,
  updateOtherDetails: () => null,
  updateAccountDetails: () => null,
  clearData: () => null,
  createApplication: () => null,
  getApplicationList: () => null,
  isCreatingApplication: false,
  isGetApplicationList: false,
  isCreatedApplication: false,
  isUpdatedAccountDetails: false,
  isUpdatedOtherDetails: false
};

export const CustomerInvokeContext = React.createContext<
  CustomerInvokeContextData
>(onboardingDefaultValue);

export function useCustomerInvokeContextValue(): CustomerInvokeContextData {
  const [_data, setData] = useState<CustomerInvokeData>({});

  const [_profile, setProfile] = useState<Profile | undefined>(undefined);
  const [_isLoadingProfile, setLoadingProfile] = useState(false);
  const [_errorLoadProfile, setErrorLoadProfile] = useState<Error | undefined>(
    undefined
  );

  const [_isUpdatingMainDetails, setUpdatingMainDetails] = useState(false);
  const [_isUpdatedMainDetails, setUpdatedMainDetails] = useState(false);
  const [_validateUser, setValidateUser] = useState(false);
  const [_errorAddMainDetails, setErrorAddMainDetails] = useState<
    Error | undefined
  >(undefined);

  const [_isUpdatingNationality, setUpdatingNationality] = useState(false);
  const [_isUpdatedNationality, setUpdatedNationality] = useState(false);
  const [_errorUpdateNationality, setErrorUpdateNationality] = useState<
    Error | undefined
  >(undefined);

  const [_isUpdatingAddressDetails, setUpdatingAddressDetails] = useState(
    false
  );
  const [_isUpdatedAddressDetails, setUpdatedAddressDetails] = useState(false);
  const [_errorUpdateAddressDetails, setErrorUpdateAddressDetails] = useState<
    Error | undefined
  >(undefined);

  const [_isCreatingApplication, setCreatingApplication] = useState(false);
  const [_isCreatedApplication, setCreatedApplication] = useState(false);
  const [_errorCreateApplication, setErrorCreateApplication] = useState<
    Error | undefined
  >(undefined);
  const [_isUpdatedOtherDetails, setUpdatedOtherDetails] = useState(false);
  const [_isUpdatedAccountDetails, setUpdatedAccountDetails] = useState(false);
  const [_applicationDetails, setApplicationDetails] = useState<
    ApplicationDetails | undefined
  >(undefined);

  const [_isGetApplicationList, setGetApplicationList] = useState(false);
  const [_applicationListData, setApplicationListData] = useState<
    ApplicationListData[] | undefined
  >(undefined);
  const [_errorGetApplicationList, setErrorGetApplicationList] = useState<
    Error | undefined
  >(undefined);

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
    if (_errorAddMainDetails) {
      setErrorAddMainDetails(undefined);
    }
    if (_validateUser) {
      setValidateUser(false);
    }
    if (_errorUpdateAddressDetails) {
      setErrorUpdateAddressDetails(undefined);
    }
    if (_errorCreateApplication) {
      setErrorCreateApplication(undefined);
    }
    if (_errorGetApplicationList) {
      setErrorGetApplicationList(undefined);
    }
  }, [
    _errorLoadProfile,
    _errorAddMainDetails,
    _validateUser,
    _errorUpdateNationality,
    _errorUpdateAddressDetails,
    _errorCreateApplication,
    _errorGetApplicationList
  ]);

  const addMainDetails = useCallback(
    async (params: MainDetailsData) => {
      try {
        setUpdatingMainDetails(true);
        const validateUserResponse = await onboardingService.addMainDetails({
          ...params,
          dateOfBirth: moment(params.dateOfBirth, "DD / MM / YYYY").format(
            "YYYY-MM-DD"
          ),
          contacts: params.email
            ? [
                {
                  contactType: "EMAIL",
                  contactValue: params.email,
                  isPrimary: true
                }
              ]
            : []
        });
        if (validateUserResponse.exist === true) {
          setValidateUser(true);
        } else {
          await onboardingService.updateMainDetails(_profile?.userId!, {
            ...params,
            dateOfBirth: moment(params.dateOfBirth, "DD / MM / YYYY").format(
              "YYYY-MM-DD"
            ),
            listCustomFields: [
              {
                customKey: "SubProcessStep",
                customValue: "Step1"
              }
            ],
            contacts: params.email
              ? [
                  {
                    contactType: "EMAIL",
                    contactValue: params.email,
                    isPrimary: true
                  }
                ]
              : []
          });

          setValidateUser(false);
          setData({
            ..._data,
            mainDetails: params
          });
          setUpdatedMainDetails(true);
          setTimeout(() => {
            setUpdatedMainDetails(false);
          }, 50);
          setUpdatingMainDetails(false);
        }
      } catch (error) {
        setUpdatingMainDetails(false);
        setErrorAddMainDetails(error as Error);
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
          isCitizen: params.isCitizen === "yes",
          listCustomFields: [
            {
              customKey: "SubProcessStep",
              customValue: "Step2"
            }
          ]
        });

        setData({
          ..._data,
          nationalityDetails: params
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
    async (
      isPresentAsPermAddress: boolean,
      addresses: AddressDetailsData[]
    ) => {
      try {
        setUpdatingAddressDetails(true);
        await onboardingService.updateAddressDetails(
          _profile?.userId!,
          isPresentAsPermAddress,
          addresses.map(address => ({
            ...address,
            addressType: address.addressType === 1 ? "Resident" : "Permanent",
            buildingNumber: "-",
            apartmentName: "-",
            county: "-"
          }))
        );
        setData({
          ..._data,
          addresses
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

  const updateProfile = useCallback((profile: any) => {
    if (profile?.middleName) {
      setData({
        ..._data,
        mainDetails: {
          firstName: profile?.firstName,
          middleName: profile?.middleName,
          lastName: profile?.lastName,
          dateOfBirth:
            moment(profile?.dateOfBirth, "YYYY-MM-DD").format(
              "DD / MM / YYYY"
            ) ?? "",
          maritalStatus: profile?.maritalStatus,
          gender: profile?.gender,
          email: profile?.contacts[0]?.contactValue
        }
      });
    }

    if (profile?.nationality) {
      setData({
        ..._data,
        mainDetails: {
          firstName: profile?.firstName,
          middleName: profile?.middleName,
          lastName: profile?.lastName,
          dateOfBirth:
            moment(profile?.dateOfBirth, "YYYY-MM-DD").format(
              "DD / MM / YYYY"
            ) ?? "",
          maritalStatus: profile?.maritalStatus,
          gender: profile?.gender,
          email: profile?.contacts[0]?.contactValue
        },
        nationalityDetails: {
          placeOfBirth: profile.placeOfBirth,
          nationality: profile.nationality,
          isCitizen: profile.isCitizen === false ? "no" : "yes"
        }
      });
    }

    if (profile?.addresses && profile?.addresses.length > 0) {
      setData({
        ..._data,
        mainDetails: {
          firstName: profile?.firstName,
          middleName: profile?.middleName,
          lastName: profile?.lastName,
          dateOfBirth:
            moment(profile?.dateOfBirth, "YYYY-MM-DD").format(
              "DD / MM / YYYY"
            ) ?? "",
          maritalStatus: profile?.maritalStatus,
          gender: profile?.gender,
          email: profile?.contacts[0]?.contactValue
        },
        nationalityDetails: {
          placeOfBirth: profile.placeOfBirth,
          nationality: profile.nationality,
          isCitizen: profile.isCitizen === false ? "no" : "yes"
        },
        addresses: [
          {
            addressType: 1, //profile?.addresses[profile?.addresses.length -1].addressType,
            line1: profile?.addresses[profile?.addresses.length - 1].line1,
            line2: profile?.addresses[profile?.addresses.length - 1].line2,
            line3: profile?.addresses[profile?.addresses.length - 1].line3,
            country: profile?.addresses[profile?.addresses.length - 1].country,
            postcode:
              profile?.addresses[profile?.addresses.length - 1].postcode,
            province:
              profile?.addresses[profile?.addresses.length - 1].province,
            region: profile?.addresses[profile?.addresses.length - 1].region,
            buildingName:
              profile?.addresses[profile?.addresses.length - 1].buildingName,
            city: profile?.addresses[profile?.addresses.length - 1].city
          }
        ]
      });
    }

    if (profile?.employmentDetails && profile?.employmentDetails.length > 0) {
      setData({
        ..._data,
        mainDetails: {
          firstName: profile?.firstName,
          middleName: profile?.middleName,
          lastName: profile?.lastName,
          dateOfBirth:
            moment(profile?.dateOfBirth, "YYYY-MM-DD").format(
              "DD / MM / YYYY"
            ) ?? "",
          maritalStatus: profile?.maritalStatus,
          gender: profile?.gender,
          email: profile?.contacts[0]?.contactValue
        },
        nationalityDetails: {
          placeOfBirth: profile.placeOfBirth,
          nationality: profile.nationality,
          isCitizen: profile.isCitizen === false ? "no" : "yes"
        },
        addresses: [
          {
            addressType: 1, //profile?.addresses[profile?.addresses.length -1].addressType,
            line1: profile?.addresses[profile?.addresses.length - 1].line1,
            line2: profile?.addresses[profile?.addresses.length - 1].line2,
            line3: profile?.addresses[profile?.addresses.length - 1].line3,
            country: profile?.addresses[profile?.addresses.length - 1].country,
            postcode:
              profile?.addresses[profile?.addresses.length - 1].postcode,
            province:
              profile?.addresses[profile?.addresses.length - 1].province,
            region: profile?.addresses[profile?.addresses.length - 1].region,
            buildingName:
              profile?.addresses[profile?.addresses.length - 1].buildingName,
            city: profile?.addresses[profile?.addresses.length - 1].city
          }
        ],
        otherDetails: {
          status:
            profile?.employmentDetails[profile?.employmentDetails.length - 1]
              .status,
          occupation:
            profile?.employmentDetails[profile?.employmentDetails.length - 1]
              .designation,
          companyType:
            profile?.employmentDetails[profile?.employmentDetails.length - 1]
              .companyType,
          companyName:
            profile?.employmentDetails[profile?.employmentDetails.length - 1]
              .companyName,
          city:
            profile?.employmentDetails[profile?.employmentDetails.length - 1]
              .addresses[0].city,
          postcode:
            profile?.employmentDetails[profile?.employmentDetails.length - 1]
              .addresses[0].postcode
        }
      });
    }
  }, []);

  const setCustomerInvokeData = useCallback((data: CustomerInvokeData) => {
    setCustomerInvokeData(data);
  }, []);

  const updateAccountDetails = useCallback(
    (params: AccountDetailsData) => {
      setData({
        ..._data,
        accountDetails: params
      });
      setUpdatedAccountDetails(true);
      setTimeout(() => {
        setUpdatedAccountDetails(false);
      }, 50);
    },
    [_data]
  );

  const updateOtherDetails = useCallback(
    async (params: OtherDetailsData) => {
      try {
        setUpdatedOtherDetails(true);

        let employmentDetails = [
          {
            status: params?.status,
            designation: params?.occupation,
            companyType: params?.companyType,
            companyName: params?.companyName,
            addresses: [
              {
                addressType: "Residential",
                city: params?.city,
                postcode: params?.postcode
              }
            ]
          }
        ];
        await onboardingService.updateEmploymentDetails(
          _profile?.userId!,
          employmentDetails
        );

        setData({
          ..._data,
          otherDetails: params
        });
        setUpdatedOtherDetails(true);
        setTimeout(() => {
          setUpdatedOtherDetails(false);
        }, 50);
      } catch (error) {
        console.log("error ", error);

        setUpdatedOtherDetails(false);
        // setErrorUpdateAddressDetails(error as Error);
      }
    },
    [_data, _profile]
  );

  const clearData = useCallback(() => {
    setData({});
    setApplicationDetails(undefined);
    setApplicationListData(undefined);
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
          setErrorCreateApplication(new Error("Missing parameters"));
          return;
        }
        setCreatingApplication(true);
        const { data } = await onboardingService.createApplication({
          submitType: "Submit",
          applicantDetails: {
            firstName: _data.mainDetails.firstName ?? "",
            lastName: _data.mainDetails.lastName ?? "",
            middleName: _data.mainDetails.middleName ?? "",
            dateOfBirth:
              moment(_data.mainDetails?.dateOfBirth, "DD / MM / YYYY").format(
                "YYYY-MM-DD"
              ) ?? "",
            maritalStatus: _data.mainDetails.maritalStatus ?? "",
            gender: _data.mainDetails.gender ?? "",
            contactDetails: _data.mainDetails.email
              ? [
                  {
                    contactType: "EMAIL",
                    contactValue: _data.mainDetails?.email!
                  }
                ]
              : [],
            placeOfBirth: _data.nationalityDetails.placeOfBirth,
            nationality: _data.nationalityDetails.nationality,
            citizenFlag: _data.nationalityDetails?.isCitizen === "yes",
            presentAsPermAddressFlag: _data.addresses?.length === 1,
            addresses:
              _data.addresses?.map(address => ({
                ...address,
                addressType:
                  address.addressType === 1 ? "Resident" : "Permanent",
                buildingNumber: "-",
                apartmentName: "-",
                county: "-"
              })) ?? []
          },
          employmentDetails: [
            {
              status: _data.otherDetails.status ?? "",
              companyName: _data.otherDetails.companyName ?? "",
              companyType: _data.otherDetails.companyType ?? "",
              addresses: [{ ..._data.otherDetails }],
              designation: _data.otherDetails.occupation
            }
          ],
          credit: {
            applicant: {
              individual: {
                accountPurpose: _data.accountDetails.accountPurpose,
                sourceOfFund: _data.accountDetails.sourceOfFund,
                currency: "PHP",
                maxMonthlyIncome: maxIncome,
                minMonthlyIncome: minIncome
              }
            }
          },
          customFields: [
            {
              customKey: "SubProcessStep",
              customValue: "Step1"
            }
          ]
        });
        setApplicationDetails({
          applicationId: data.applicationId,
          firstName: data.applicantDetails.firstName,
          lastName: data.applicantDetails.lastName,
          middleName: data.applicantDetails.middleName
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

  const getApplicationList = useCallback(async () => {
    try {
      setGetApplicationList(true);
      const { data } = await onboardingService.getApplicationList();
      setApplicationListData(data);
      setGetApplicationList(false);
    } catch (error) {
      setGetApplicationList(false);
      setErrorGetApplicationList(error as Error);
    }
  }, []);

  return useMemo(
    () => ({
      getUserProfile,
      clearErrors,
      profile: _profile,
      isLoadingProfile: _isLoadingProfile,
      errorLoadProfile: _errorLoadProfile,
      addMainDetails,
      isUpdatingMainDetails: _isUpdatingMainDetails,
      errorAddMainDetails: _errorAddMainDetails,
      isInValidateUser: _validateUser,
      updateNationality,
      isUpdatingNationality: _isUpdatingNationality,
      errorUpdateNationality: _errorUpdateNationality,
      updateAddressDetails,
      isUpdatingAddressDetails: _isUpdatingAddressDetails,
      errorUpdateAddressDetails: _errorUpdateAddressDetails,
      setUserProfile,
      updateProfile,
      getApplicationList,
      isUpdatedAddressDetails: _isUpdatedAddressDetails,
      isUpdatedMainDetails: _isUpdatedMainDetails,
      isUpdatedNationality: _isUpdatedNationality,
      setCustomerInvokeData,
      data: _data,
      updateAccountDetails,
      updateOtherDetails,
      clearData,
      createApplication,
      isCreatedApplication: _isCreatedApplication,
      isCreatingApplication: _isCreatingApplication,
      isGetApplicationList: _isGetApplicationList,
      errorCreateApplication: _errorCreateApplication,
      errorGetApplicationList: _errorGetApplicationList,
      isUpdatedAccountDetails: _isUpdatedAccountDetails,
      isUpdatedOtherDetails: _isUpdatedOtherDetails,
      applicationDetails: _applicationDetails,
      applicationList: _applicationListData
    }),
    [
      _applicationDetails,
      _applicationListData,
      _data,
      _isUpdatedOtherDetails,
      _isUpdatedAccountDetails,
      _isCreatedApplication,
      _isCreatingApplication,
      _isGetApplicationList,
      _errorCreateApplication,
      _errorGetApplicationList,
      _isUpdatedNationality,
      _isUpdatedMainDetails,
      _isUpdatedAddressDetails,
      _profile,
      _isLoadingProfile,
      _errorLoadProfile,
      _isUpdatingMainDetails,
      _errorAddMainDetails,
      _validateUser,
      _isUpdatingNationality,
      _errorUpdateNationality,
      _isUpdatingAddressDetails,
      _errorUpdateAddressDetails
    ]
  );
}
