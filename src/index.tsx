import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Text
} from "react-native";
import { ApplicationDetails, InitCustomerInvokeData, StepData } from "./types";
import useMergeStyles from "./styles";
import MainDetailComponent, {
  MainDetailComponentStyles
} from "./components/main-detail-component";
import NationalityComponent, {
  NationalityComponentStyles
} from "./components/nationality-component";
import { BackIcon, InfoIcon } from "./assets/icons";
import AddressDetailsComponent, {
  AddressDetailsComponentStyles
} from "./components/address-detail-component";
import OtherDetailsComponent, {
  OtherDetailsComponentStyles
} from "./components/other-details-component";
import AccountDetailsComponent, {
  AccountDetailsComponentStyles
} from "./components/account-details-component";
import { HeaderComponentStyles } from "./components/header-component";
import { CustomerInvokeContext } from "./context/onboarding-context";
import { showMessage } from "react-native-flash-message";
import { Button, ThemeContext } from "react-native-theme-component";

export type CustomerInvokeComponentProps = {
  onCompleted: (data: ApplicationDetails) => void;
  initData?: InitCustomerInvokeData;
  onBack: () => void;
  onLogin?: () => void;
  initStep: StepData;
  steps?: StepData[];
  style?: CustomerInvokeComponentStyles;
  backIcon?: ReactNode;
};

export type CustomerInvokeComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  progressBarStyle?: StyleProp<ViewStyle>;
  activeBarStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  headerComponentStyles?: HeaderComponentStyles;
  mainDetailsComponentStyles?: MainDetailComponentStyles;
  nationalityComponentStyles?: NationalityComponentStyles;
  addressDetailsComponentStyles?: AddressDetailsComponentStyles;
  otherDetailsComponentStyles?: OtherDetailsComponentStyles;
  accountDetailsComponentStyles?: AccountDetailsComponentStyles;
};

export const defaultCustomerInvokeSteps: StepData[] = [
  {
    id: "main-details",
    title: "We want to know you more",
    subTitle: "Enter main details.",
    progress: 5 / 12
  },
  {
    id: "nationality-details",
    title: "Are you a local?",
    subTitle: "Select your nationality.",
    progress: 6 / 12
  },
  {
    id: "address-details",
    title: "Where do you live?",
    subTitle: "Enter address details.",
    progress: 7 / 12
  },
  {
    id: "other-details",
    title: "What do you do for a living?",
    subTitle: "Enter other details.",
    progress: 8 / 12
  },
  {
    id: "account-details",
    title: "Account details",
    subTitle: "Select where you get your funds.",
    progress: 9 / 12
  }
];

const CustomerInvokeComponent = (props: CustomerInvokeComponentProps) => {
  const {
    onCompleted,
    steps,
    style,
    initStep,
    backIcon,
    onBack,
    onLogin,
    initData
  } = props;
  const _steps = steps ?? defaultCustomerInvokeSteps;
  const styles: CustomerInvokeComponentStyles = useMergeStyles(style);
  const [step, setStep] = useState<StepData>(initStep);
  const [showErrorModel, setShowErrorModel] = useState<boolean>(false);
  const {
    data,
    clearData,
    clearErrors,
    isCreatedApplication,
    errorAddMainDetails,
    errorUpdateAddressDetails,
    errorUpdateNationality,
    errorCreateApplication,
    applicationDetails,
    isInValidateUser
  } = useContext(CustomerInvokeContext);

  const { i18n } = useContext(ThemeContext);
  useEffect(() => {
    if (errorAddMainDetails) {
      showMessage({
        message: "Errror while updating main details. Please try again",
        backgroundColor: "#ff0000"
      });
      clearErrors();
    }
    if (errorUpdateAddressDetails) {
      showMessage({
        message: "Errror while updating addresses details. Please try again",
        backgroundColor: "#ff0000"
      });
      clearErrors();
    }
    if (errorUpdateNationality) {
      showMessage({
        message: "Errror while updating nationality details. Please try again",
        backgroundColor: "#ff0000"
      });
      clearErrors();
    }
    if (errorCreateApplication) {
      showMessage({
        message: "Errror while creating application details. Please try again",
        backgroundColor: "#ff0000"
      });
      clearErrors();
    }
    if (isInValidateUser) {
      setShowErrorModel(true);
      clearErrors();
    }
  }, [
    errorAddMainDetails,
    errorUpdateAddressDetails,
    errorUpdateNationality,
    errorCreateApplication,
    isInValidateUser
  ]);

  useEffect(() => {
    if (isCreatedApplication && applicationDetails) {
      onCompleted(applicationDetails);
    }
  }, [isCreatedApplication]);

  const _handleBack = () => {
    const _index = _steps.findIndex(s => s.id === step.id);
    if (_index === -1) {
      return;
    }
    if (_index === 0) {
      onBack();
      return;
    }
    setStep(_steps[_index - 1]);
  };

  useEffect(() => {
    return () => {
      clearData();
      clearErrors();
    };
  }, []);

  console.log('data ',data);


  if (showErrorModel) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentBox}>
          <InfoIcon width={60} height={60} color={"#E06D6D"} />
          <Text style={styles.messageTitle}>
            {i18n?.t("customer_invoke_component.lbl_account_exists") ??
              "Account already exists"}
          </Text>
          <Text style={styles.messageDescription}>
            {i18n?.t("customer_invoke_component.msg_account_exists") ??
              "Looks like the personal information you entered has a linked UnionDigital Bank Account already. Please login to your account."}
          </Text>
        </View>
        <Button
          onPress={() => {
            onLogin();
            setShowErrorModel(false);
            // navigation.navigate(Route.USER_NAME_REGISTER_SCREEN, {});
          }}
          label="Proceed to login"
          style={{
            primaryContainerStyle: {
              marginHorizontal: 24,
              marginBottom: Platform.OS === "android" ? 24 : 0
            }
          }}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.containerStyle}>
          <SafeAreaView>
            <View style={styles.progressBarStyle}>
              <View
                style={[
                  styles.activeBarStyle,
                  { width: `${step.progress * 100}%` }
                ]}
              />
            </View>
          </SafeAreaView>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={_handleBack}
            style={styles.backButtonContainerStyle}
          >
            {backIcon ?? <BackIcon width={17} height={12} />}
          </TouchableOpacity>
          {step.id === "main-details" && (
            <MainDetailComponent
              firstName={initData?.firstName}
              lastName={initData?.lastName}
              initData={data?.mainDetails}
              header={{
                style: styles?.headerComponentStyles,
                data: step
              }}
              onContinue={() => {
                setStep(_steps[1]);
              }}
              style={styles?.mainDetailsComponentStyles}
            />
          )}
          {step.id === "nationality-details" && (
            <NationalityComponent
              initData={data?.nationalityDetails}
              header={{
                style: styles?.headerComponentStyles,
                data: step
              }}
              onContinue={() => {
                setStep(_steps[2]);
              }}
              style={styles.nationalityComponentStyles}
            />
          )}
          {step.id === "address-details" && (
            <AddressDetailsComponent
              initValue={data?.addresses}
              header={{
                style: styles?.headerComponentStyles,
                data: step
              }}
              onContinue={() => {
                setStep(_steps[3]);
              }}
              style={styles.addressDetailsComponentStyles}
            />
          )}
          {step.id === "other-details" && (
            <OtherDetailsComponent
              initValue={data?.otherDetails}
              header={{
                style: styles?.headerComponentStyles,
                data: step
              }}
              onContinue={() => {
                setStep(_steps[4]);
              }}
              style={styles.otherDetailsComponentStyles}
            />
          )}
          {step.id === "account-details" && (
            <AccountDetailsComponent
              initValue={data?.accountDetails}
              header={{
                style: styles?.headerComponentStyles,
                data: step
              }}
              style={styles.accountDetailsComponentStyles}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
};

export default CustomerInvokeComponent;
