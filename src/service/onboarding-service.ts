import {
  AddressParams,
  EmploymentDetailParams,
  CreateApplicationParams,
  MainDetailParam,
  NationalityParam,
  ValidateMainDetailParam
} from "../types";

type OnboaringClient = {
  membershipClient: any;
  accountOriginationClient: any;
};

export class CustomerInvokeService {
  private static _instance: CustomerInvokeService = new CustomerInvokeService();

  private _membershipClient?: any;
  private _accountOriginationClient?: any;

  constructor() {
    if (CustomerInvokeService._instance) {
      throw new Error(
        "Error: Instantiation failed: Use CustomerInvokeService.getInstance() instead of new."
      );
    }
    CustomerInvokeService._instance = this;
  }

  public static instance(): CustomerInvokeService {
    return CustomerInvokeService._instance;
  }

  public initClients = (clients: OnboaringClient) => {
    this._membershipClient = clients.membershipClient;
    this._accountOriginationClient = clients.accountOriginationClient;
  };

  getProfile = async () => {
    if (this._membershipClient) {
      const response = await this._membershipClient.get("users/me");
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  addMainDetails = async (details: ValidateMainDetailParam) => {
    if (this._membershipClient) {
      const response = await this._membershipClient.post(
        `users/validate`,
        details
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  updateMainDetails = async (userId: string, details: MainDetailParam) => {
    if (this._membershipClient) {
      const response = await this._membershipClient.patch(
        `users/${userId}`,
        details
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  updateNationalityDetails = async (
    userId: string,
    details: NationalityParam
  ) => {
    if (this._membershipClient) {
      const response = await this._membershipClient.patch(
        `users/${userId}`,
        details
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  updateAddressDetails = async (
    userId: string,
    isPresentAsPermAddress: boolean,
    addresses: AddressParams[]
  ) => {
    if (this._membershipClient) {
      const response = await this._membershipClient.patch(`users/${userId}`, {
        isPresentAsPermAddress,
        addresses,
        listCustomFields: [
          {
            customKey: "SubProcessStep",
            customValue: "Step3"
          }
        ]
      });
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  updateEmploymentDetails = async (
    userId: string,
    employmentDetails: EmploymentDetailParams[]
  ) => {
    if (this._membershipClient) {
      const response = await this._membershipClient.patch(`users/${userId}`, {
        employmentDetails,
        listCustomFields: [
          {
            customKey: "SubProcessStep",
            customValue: "Step4"
          }
        ]
      });
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  createApplication = async (params: CreateApplicationParams) => {
    if (this._accountOriginationClient) {
      const response = await this._accountOriginationClient.post(
        "applications",
        params
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  getApplicationList = async () => {
    if (this._accountOriginationClient) {
      const response = await this._accountOriginationClient.get("applications");
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  getOnfidoSdkToken = async (
    applicationId: string,
    firstName: string,
    lastName: string
  ) => {
    if (this._membershipClient) {
      const response = await this._accountOriginationClient.post(
        `/applications/${applicationId}/kyc/requests`,
        { firstName, lastName }
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  checkOnfidoSdkToken = async (applicationId: string, requestId: string) => {
    if (this._membershipClient) {
      const response = await this._accountOriginationClient.put(
        `/applications/${applicationId}/kyc/requests/${requestId}`,
        { reportNames: ["document"] }
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };
}
