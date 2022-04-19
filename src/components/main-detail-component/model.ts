import * as Yup from "yup";

export class MainDetailsData {
  constructor(
    readonly firstName: string,
    readonly middleName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly maritalStatus: string,
    readonly gender: string,
    readonly email?: string
  ) {}

  static empty(
    firstName?: string,
    midName?: string,
    lastName?: string,
    dateOfBirth?: string,
    civil?: string,
    gender?: string,
    email?: string
  ): MainDetailsData {
    return new MainDetailsData(
      firstName ?? "",
      midName ?? "",
      lastName ?? "",
      dateOfBirth ?? "",
      civil ?? "",
      gender ?? "",
      email ?? ""
    );
  }
}

export const MainDetailsSchema = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required("Enter first name"),
    middleName: Yup.string()
      .trim()
      .required("Enter middle name"),
    lastName: Yup.string()
      .trim()
      .required("Enter last name"),
    dateOfBirth: Yup.string()
      .trim()
      .required("Select date of birth"),
    maritalStatus: Yup.string()
      .trim()
      .required("Select civil status"),
    gender: Yup.string()
      .trim()
      .required("Select gender"),
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Enter email address")
  });
