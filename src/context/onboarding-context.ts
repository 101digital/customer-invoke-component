import moment from "moment";
import { AccountDetailsData } from "./../components/account-details-component/model";
import { OtherDetailsData } from "./../components/other-details-component/model";
import React, { useCallback, useMemo, useState } from "react";
import { AddressDetailsData } from "../components/address-detail-component/model";
import { MainDetailsData } from "../components/main-detail-component/model";
import { NationalityData } from "../components/nationality-component/model";
import { CustomerInvokeService } from "../service/onboarding-service";
import { authComponentStore } from 'react-native-auth-component';


import {
  CustomerInvokeData,
  Profile,
  ApplicationDetails,
  ApplicationListData,
  CountryListData,
  ProvinceListData,
  ProvincePagingData
} from "../types";

import {Occupation } from '../types';
const occupationData = require('../assets/data/occupation.json');


const onboardingService = CustomerInvokeService.instance();
const occupationsList: Occupation[] = JSON.parse(JSON.stringify(occupationData));
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
  isGetCountryList: boolean;
  getCountryList: () => void;
  errorGetCountryList?: Error;
  isUpdatedOtherDetails: boolean;
  isUpdatedAccountDetails: boolean;
  applicationDetails?: ApplicationDetails;
  applicationList?: ApplicationListData;
  countryList?:CountryListData;
  getProvinceList:(contryId:number,pageNumber:number,searchText?:string,parentLocationId?:string) => void;
  provinceList?:ProvinceListData;
  provincePaging?:ProvincePagingData;
  getRegionList:(contryId:number,pageNumber:number,searchText?:string) => void;
  regionList?:LocationListData;
  regionPaging?:LocationPagingData;
  getMunicipalityList:(contryId:number,pageNumber:number,searchText?:string,parentLocationId?:string) => void;
  municipalityList?:LocationListData;
  municipalityPaging?:LocationPagingData;
  getBarangayList:(contryId:number,pageNumber:number,searchText?:string,parentLocationId?:string) => void;
  barangayList?:LocationListData;
  barangayPaging?:LocationPagingData;
  getProvinceListWithLocationId:(contryId:number,pageNumber:number,searchText?:string) => void;
  provinceListWithLocationId?:ProvinceListData;
  provinceWithLocationIdPaging?:ProvincePagingData;
  isGetProvinceList: boolean;
  createCryptoApplication: (contentTemplateId:string) => void;
  cryptoApplicationDetails?: ApplicationDetails;
  cryptoErrorCreateApplication?: Error;
  isCryptoCreatingApplication: boolean;
  isCryptoCreatedApplication: boolean;
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
  getCountryList: () => null,
  isGetCountryList: false,
  isCreatedApplication: false,
  isUpdatedAccountDetails: false,
  isUpdatedOtherDetails: false,
  getProvinceList: () => null,
  getRegionList: () => null,
  getMunicipalityList: () => null,
  getBarangayList: () => null,
  getProvinceListWithLocationId: () => null,
  isGetProvinceList:false,
  createCryptoApplication: () => null,
  isCryptoCreatingApplication: false,
  isCryptoCreatedApplication: false,
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

  const [_isGetCountryList, setGetCountryList] = useState(false);
  const [_CountryListData, setCountryListData] = useState<
    CountryListData[] | undefined
  >(undefined);
  const [_errorGetCountryList, setErrorGetCountryList] = useState<
    Error | undefined
  >(undefined);


  const [_isGetProvinceList, setGetProvinceList] = useState(false);
  const [_ProvinceListData, setProvinceListData] = useState<
    ProvinceListData[] | undefined
  >(undefined);
  const [_ProvinceListPagingData, setProvinceListPagingData] = useState<
    ProvincePagingData | undefined
  >(undefined);
  const [_errorGetProvinceList, setErrorGetProvinceList] = useState<
    Error | undefined
  >(undefined);


  const [_isGetProvinceListWithLocationId, setGetProvinceListWithLocationId] = useState(false);
  const [_ProvinceListWithLocationIdData, setProvinceListWithLocationIdData] = useState<
    ProvinceListData[] | undefined
  >(undefined);
  const [_ProvinceListWithLocationIdPagingData, setProvinceListWithLocationIdPagingData] = useState<
    ProvincePagingData | undefined
  >(undefined);
  const [_errorGetProvinceListWithLocationId, setErrorGetProvinceListWithLocationId] = useState<
    Error | undefined
  >(undefined);



  const [_isGetRegionList, setGetRegionList] = useState(false);
  const [_RegionListData, setRegionListData] = useState<
    LocationListData[] | undefined
  >(undefined);
  const [_RegionListPagingData, setRegionListPagingData] = useState<
    LocationPagingData | undefined
  >(undefined);
  const [_errorGetRegionList, setErrorGetRegionList] = useState<
    Error | undefined
  >(undefined);


  const [_isGetMunicipalityList, setGetMunicipalityList] = useState(false);
  const [_MunicipalityListData, setMunicipalityListData] = useState<
    LocationListData[] | undefined
  >(undefined);
  const [_MunicipalityListPagingData, setMunicipalityListPagingData] = useState<
    LocationPagingData | undefined
  >(undefined);
  const [_errorGetMunicipalityList, setErrorGetMunicipalityList] = useState<
    Error | undefined
  >(undefined);

  const [_isGetBarangayList, setGetBarangayList] = useState(false);
  const [_BarangayListData, setBarangayListData] = useState<
    LocationListData[] | undefined
  >(undefined);
  const [_BarangayListPagingData, setBarangayListPagingData] = useState<
    LocationPagingData | undefined
  >(undefined);
  const [_errorGetBarangayList, setErrorGetBarangayList] = useState<
    Error | undefined
  >(undefined);

  const [_cryptoApplicationDetails, setCryptoApplicationDetails] = useState<
    ApplicationDetails | undefined
  >(undefined);

  const [_isCryptoCreatingApplication, setCryptoCreatingApplication] = useState(false);
  const [_isCryptoCreatedApplication, setCryptoCreatedApplication] = useState(false);
  const [_cryptoErrorCreateApplication, setCryptoErrorCreateApplication] = useState<
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
    if (_errorGetCountryList) {
      setErrorGetCountryList(undefined);
    }
    if (_errorGetProvinceList) {
      setErrorGetProvinceList(undefined);
    }
    if (_errorGetRegionList) {
      setErrorGetRegionList(undefined);
    }
    if (_errorGetMunicipalityList) {
      setErrorGetMunicipalityList(undefined);
    }
    if (_errorGetBarangayList) {
      setErrorGetBarangayList(undefined);
    }
    if (_errorGetProvinceListWithLocationId) {
      setErrorGetProvinceListWithLocationId(undefined);
    }
    if (_cryptoErrorCreateApplication) {
      setCryptoErrorCreateApplication(undefined);
    }
  }, [
    _errorLoadProfile,
    _errorAddMainDetails,
    _validateUser,
    _errorUpdateNationality,
    _errorUpdateAddressDetails,
    _errorCreateApplication,
    _errorGetApplicationList,
    _errorGetCountryList,
    _errorGetProvinceList,
    _errorGetRegionList,
    _errorGetMunicipalityList,
    _errorGetBarangayList,
    _errorGetProvinceListWithLocationId,
    _cryptoErrorCreateApplication
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
          const response = await onboardingService.updateMainDetails(_profile?.userId!, {
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

          await authComponentStore.storeProfile(response.data);

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
        const response = await onboardingService.updateNationalityDetails(_profile?.userId!, {
          ...params,
          isCitizen: params.isCitizen === "yes",
          listCustomFields: [
            {
              customKey: "SubProcessStep",
              customValue: "Step2"
            }
          ]
        });

        await authComponentStore.storeProfile(response.data);

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
        const response = await onboardingService.updateAddressDetails(
          _profile?.userId!,
          isPresentAsPermAddress,
          addresses.map(address => ({
            ...address,
            addressType:
              address.addressType === 1 ? "Residential" : "Permanent",
            buildingNumber: "-",
            apartmentName: "-",
            county: "-"
          }))
        );

        await authComponentStore.storeProfile(response.data);
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
      let formatedData =  occupationsList.find((o) => o.name === profile?.employmentDetails[profile?.employmentDetails.length - 1]
        .designation || o.label === profile?.employmentDetails[profile?.employmentDetails.length - 1]
          .designation)

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
          occupation:formatedData.label,
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

        let formatedData =  occupationsList.find((o) => o.label === params.occupation)

        let employmentDetails = [
          {
            status: params?.status,
            designation: formatedData.name,
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
        const  response =await onboardingService.updateEmploymentDetails(
          _profile?.userId!,
          employmentDetails
        );

        await authComponentStore.storeProfile(response.data);

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
    setCountryListData(undefined);
    setProvinceListData(undefined);
    setProvinceListPagingData(undefined)
    setRegionListData(undefined);
    setRegionListPagingData(undefined);
    setMunicipalityListData(undefined);
    setMunicipalityListPagingData(undefined);
    setBarangayListData(undefined);
    setBarangayListPagingData(undefined);
    setCryptoApplicationDetails(undefined);
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
                  address.addressType === 1 ? "Residential" : "Permanent",
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
      setTimeout(() => {
        setGetApplicationList(false);
      }, 50);
    } catch (error) {
      setGetApplicationList(false);
      setErrorGetApplicationList(error as Error);
    }
  }, []);

  const getCountryList = useCallback(async () => {
    try {
      setGetCountryList(true);
      const { data } = await onboardingService.getCountryList();
      setCountryListData(data);
      setTimeout(() => {
        setGetCountryList(false);
      }, 50);
    } catch (error) {
      setGetCountryList(false);
      setErrorGetCountryList(error as Error);
    }
  }, []);

  const getProvinceList = useCallback(async (contryId:number,pageNumber:number,searchText?:string,parentLocationId?:string) => {
    try {
      setGetProvinceList(true);

      const { data, paging } = await onboardingService.getProvinceList(contryId,pageNumber,searchText,parentLocationId?parentLocationId:null);
      if (pageNumber === 1) {
        setProvinceListData(data);
        setProvinceListPagingData(paging)
      }else{
        setProvinceListData([..._ProvinceListData,...data]);
        setProvinceListPagingData(paging)
      }

      setTimeout(() => {
        setGetProvinceList(false);
      }, 50);
    } catch (error) {
      setGetProvinceList(false);
      setErrorGetProvinceList(error as Error);
    }
  }, [setProvinceListData,_ProvinceListData]);

  const getProvinceListWithLocationId = useCallback(async (contryId:number,pageNumber:number,searchText?:string) => {
    try {
      setGetProvinceListWithLocationId(true);

      const { data, paging } = await onboardingService.getProvinceList(contryId,pageNumber,searchText,null);
      if (pageNumber === 1) {
        setProvinceListWithLocationIdData(data);
        setProvinceListWithLocationIdPagingData(paging)
      }else{
        setProvinceListWithLocationIdData([..._ProvinceListLocationIdData,...data]);
        setProvinceListWithLocationIdPagingData(paging)
      }

      setTimeout(() => {
        setGetProvinceListWithLocationId(false);
      }, 50);
    } catch (error) {
      setGetProvinceListWithLocationId(false);
      setErrorGetProvinceListWithLocationId(error as Error);
    }
  }, [setProvinceListWithLocationIdData,_ProvinceListWithLocationIdData]);

  const getRegionList = useCallback(async (contryId:number,pageNumber:number,searchText?:string) => {
    try {
      setGetRegionList(true);

      const { data, paging } = await onboardingService.getRegionList(contryId,pageNumber,searchText);
      if (pageNumber === 1) {
        setRegionListData(data);
        setRegionListPagingData(paging)
      }else{
        setRegionListData([..._RegionListData,...data]);
        setRegionListPagingData(paging)
      }

      setTimeout(() => {
        setGetRegionList(false);
      }, 50);
    } catch (error) {
      setGetRegionList(false);
      setErrorGetRegionList(error as Error);
    }
  }, [setRegionListData,_RegionListData]);

  const getMunicipalityList = useCallback(async (contryId:number,pageNumber:number,searchText?:string,parentLocationId?:string) => {
    try {
      setGetMunicipalityList(true);

      const { data, paging } = await onboardingService.getMunicipalityList(contryId,pageNumber,searchText,parentLocationId?parentLocationId:null);
      if (pageNumber === 1) {
        setMunicipalityListData(data);
        setMunicipalityListPagingData(paging)
      }else{
        setMunicipalityListData([..._MunicipalityListData,...data]);
        setMunicipalityListPagingData(paging)
      }

      setTimeout(() => {
        setGetMunicipalityList(false);
      }, 50);
    } catch (error) {
      setGetMunicipalityList(false);
      setErrorGetMunicipalityList(error as Error);
    }
  }, [setMunicipalityListData,_MunicipalityListData]);

  const getBarangayList = useCallback(async (contryId:number,pageNumber:number,searchText?:string,parentLocationId?:string) => {
    try {
      setGetBarangayList(true);

      const { data, paging } = await onboardingService.getBarangayList(contryId,pageNumber,searchText,parentLocationId?parentLocationId:null);
      if (pageNumber === 1) {
        setBarangayListData(data);
        setBarangayListPagingData(paging)
      }else{
        setBarangayListData([..._BarangayListData,...data]);
        setBarangayListPagingData(paging)
      }

      setTimeout(() => {
        setGetBarangayList(false);
      }, 50);
    } catch (error) {
      setGetBarangayList(false);
      setErrorGetBarangayList(error as Error);
    }
  }, [setBarangayListData,_BarangayListData]);

  const createCryptoApplication = useCallback( async (contentTemplateId:string) => {

      try {
        if (
          !_data.mainDetails ||
          !_data.nationalityDetails
        ) {
          setCryptoErrorCreateApplication(new Error("Missing parameters"));
          return;
        }
        setCryptoCreatingApplication(true);
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
            placeOfBirth: _data.nationalityDetails.placeOfBirth,
            countryOfBirth: _data.nationalityDetails.nationality,
            nationality: _data.nationalityDetails.nationality,
            citizenFlag: _data.nationalityDetails?.isCitizen === "yes",
          },
          productDetails: {
              bankId: "PDAX",
              productId: "CryptoAccountPdax",
              productType: "CRYPTO"
          }
        });

        await _linkCryptoAccount(contentTemplateId,data.applicationId);

        setCryptoApplicationDetails({
          applicationId: data.applicationId,
          firstName: data.applicantDetails.firstName,
          lastName: data.applicantDetails.lastName,
          middleName: data.applicantDetails.middleName
        });
        setCryptoCreatedApplication(true);
        setTimeout(() => {
          setCryptoCreatedApplication(false);
        }, 50);
        setCryptoCreatingApplication(false);
      } catch (error) {
        setCryptoCreatingApplication(false);
        setCryptoErrorCreateApplication(error as Error);
      }
    },
    [_data]
  );

  const _linkCryptoAccount = async (contentTemplateId:string,applicationId:string) => {

    try {
      await onboardingService.updateApplicationTc(contentTemplateId,applicationId);
      await onboardingService.validateCryptoAccount(applicationId);
      // console.log('resp2 ',resp2);
      return true;
    } catch (error) {
      setCryptoErrorCreateApplication(error as Error);
      return 'error';
    }

  };


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
      getCountryList,
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
      isGetCountryList: _isGetCountryList,
      errorGetCountryList: _errorGetCountryList,
      isUpdatedAccountDetails: _isUpdatedAccountDetails,
      isUpdatedOtherDetails: _isUpdatedOtherDetails,
      applicationDetails: _applicationDetails,
      applicationList: _applicationListData,
      countryList: _CountryListData,
      getProvinceList,
      isGetProvinceList:_isGetProvinceList,
      provinceList: _ProvinceListData,
      provincePaging: _ProvinceListPagingData,
      errorGetProvinceList: _errorGetProvinceList,
      getProvinceListWithLocationId,
      isGetProvinceListWithLocationId:_isGetProvinceListWithLocationId,
      provinceListWithLocationId: _ProvinceListWithLocationIdData,
      provinceWithLocationIdPaging: _ProvinceListWithLocationIdPagingData,
      errorGetProvinceListWithLocationId: _errorGetProvinceListWithLocationId,
      getRegionList,
      isGetRegionList:_isGetRegionList,
      regionList: _RegionListData,
      regionPaging: _RegionListPagingData,
      errorGetRegionList: _errorGetRegionList,
      getMunicipalityList,
      isGetMunicipalityList:_isGetMunicipalityList,
      municipalityList: _MunicipalityListData,
      municipalityPaging: _MunicipalityListPagingData,
      errorGetMunicipalityList: _errorGetMunicipalityList,
      getBarangayList,
      isGetBarangayList:_isGetBarangayList,
      barangayList: _BarangayListData,
      barangayPaging: _BarangayListPagingData,
      errorGetBarangayList: _errorGetBarangayList,
      createCryptoApplication,
      cryptoApplicationDetails: _cryptoApplicationDetails,
      cryptoErrorCreateApplication: _cryptoErrorCreateApplication,
      isCryptoCreatingApplication: _isCryptoCreatingApplication,
      isCryptoCreatedApplication: _isCryptoCreatedApplication,
    }),
    [
      _applicationDetails,
      _applicationListData,
      _CountryListData,
      _data,
      _isUpdatedOtherDetails,
      _isUpdatedAccountDetails,
      _isCreatedApplication,
      _isCreatingApplication,
      _isGetApplicationList,
      _errorCreateApplication,
      _errorGetApplicationList,
      _isGetCountryList,
      _errorGetCountryList,
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
      _errorUpdateAddressDetails,
      _isGetProvinceList,
      _ProvinceListData,
      _errorGetProvinceList,
      _ProvinceListPagingData,
      _isGetRegionList,
      _RegionListData,
      _errorGetRegionList,
      _RegionListPagingData,
      _isGetMunicipalityList,
      _MunicipalityListData,
      _errorGetMunicipalityList,
      _MunicipalityListPagingData,
      _isGetBarangayList,
      _BarangayListData,
      _errorGetBarangayList,
      _BarangayListPagingData,
      _isGetProvinceListWithLocationId,
      _ProvinceListWithLocationIdData,
      _errorGetProvinceListWithLocationId,
      _ProvinceListWithLocationIdPagingData,
      _cryptoApplicationDetails,
      _cryptoErrorCreateApplication,
      _isCryptoCreatingApplication,
      _isCryptoCreatedApplication
    ]
  );
}
