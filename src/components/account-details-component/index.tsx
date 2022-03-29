import { Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, InputField, ThemeContext } from "react-native-theme-component";
import { ArrowDownIcon } from "../../assets/icons";
import { OnboardingContext } from "../../context/onboarding-context";
import HeaderComponent, { HeaderComponentProps } from "../header-component";
import KeyboardSpace from "../sub-components/keyboard-space";
import { RadioData } from "../sub-components/radio-group";
import SelectAccountPurposeModal, {
  SelectAccountPurposeModalStyles
} from "./components/select-account-purpose";
import SelectMonthlyTransactionModal from "./components/select-monthly-transaction";
import SelectSourceOfFundModal, {
  SelectSourceOfFundModalStyles
} from "./components/select-source-fund-modal";
import { AccountDetailsData, AccountDetailsSchema } from "./model";
import useMergeStyles from "./styles";

export type AccountDetailsComponentProps = {
  initValue?: AccountDetailsData;
  header: HeaderComponentProps;
  style?: AccountDetailsComponentStyles;
};

export type AccountDetailsComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  suffixContainerStyle?: StyleProp<ViewStyle>;
  optionalTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  accountPurposeModalStyles?: SelectAccountPurposeModalStyles;
  sourceOfFundModalStyles?: SelectSourceOfFundModalStyles;
  monthlyTransactionModalStyles?: SelectSourceOfFundModalStyles;
};

const AccountDetailsComponent = ({
  style,
  initValue,
  header
}: AccountDetailsComponentProps) => {
  const styles: AccountDetailsComponentStyles = useMergeStyles(style);
  const formikRef: any = useRef(null);
  const { colors, i18n } = useContext(ThemeContext);
  const [openAccountPurposeModal, setOpenAccountPurposeModal] = useState(false);
  const [
    openMonthlyTransactionModal,
    setOpenMonthlyTransactionModal
  ] = useState(false);
  const [openSourceFundModal, setOpenSourceFundModal] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState<RadioData | undefined>(
    undefined
  );

  const {
    updateAccountDetails,
    isCreatingApplication,
    isUpdatedAccountDetails,
    createApplication
  } = useContext(OnboardingContext);

  useEffect(() => {
    if (isUpdatedAccountDetails) {
      const income = getMonthlyIncome();
      createApplication(income?.min, income?.max);
    }
  }, [isUpdatedAccountDetails]);

  const getMonthlyIncome = () => {
    switch (monthlyIncome?.id) {
      case "1":
        return {
          max: 50000,
          min: undefined
        };
      case "2":
        return {
          max: 100000,
          min: 50001
        };
      case "3":
        return {
          max: 250000,
          min: 100001
        };
      case "4":
        return {
          max: 500000,
          min: 250001
        };
      case "5":
        return {
          max: undefined,
          min: 500000
        };
      default:
        break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      formikRef?.current?.validateForm();
    }, 0);
  }, []);

  return (
    <>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={initValue ?? AccountDetailsData.empty()}
        validationSchema={AccountDetailsSchema()}
        onSubmit={updateAccountDetails}
      >
        {({ isValid, submitForm }) => {
          return (
            <View style={styles.containerStyle}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.contentContainerStyle}
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={50}
              >
                <TouchableOpacity onPress={() => {}}>
                  <HeaderComponent {...header} />
                </TouchableOpacity>
                <Text style={styles.labelTextStyle}>
                  {i18n?.t("account-details-component.lbl_source_of_funds") ??
                    "Source of funds"}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setOpenSourceFundModal(true);
                  }}
                >
                  <InputField
                    name={"sourceOfFund"}
                    placeholder={
                      i18n?.t(
                        "account-details-component.plh_source_of_funds"
                      ) ?? "Select source of funds"
                    }
                    pointerEvents="none"
                    editable={false}
                    suffixIcon={
                      <View style={styles.suffixContainerStyle}>
                        <ArrowDownIcon width={24} height={24} />
                      </View>
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.labelTextStyle}>
                  {i18n?.t("account-details-component.lbl_account_purpose") ??
                    "Account purpose"}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setOpenAccountPurposeModal(true);
                  }}
                >
                  <InputField
                    name={"accountPurpose"}
                    placeholder={
                      i18n?.t(
                        "account-details-component.plh_account_purpose"
                      ) ?? "Select account purpose"
                    }
                    pointerEvents="none"
                    editable={false}
                    suffixIcon={
                      <View style={styles.suffixContainerStyle}>
                        <ArrowDownIcon width={24} height={24} />
                      </View>
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.labelTextStyle}>
                  {i18n?.t("account-details-component.lbl_transaction") ??
                    "Estimated monthly transaction"}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setOpenMonthlyTransactionModal(true);
                  }}
                >
                  <InputField
                    name={"monthlyIncome"}
                    placeholder={
                      i18n?.t("account-details-component.plh_transaction") ??
                      "Select estimated monthly transaction"
                    }
                    pointerEvents="none"
                    editable={false}
                    suffixIcon={
                      <View style={styles.suffixContainerStyle}>
                        <ArrowDownIcon width={24} height={24} />
                      </View>
                    }
                  />
                </TouchableOpacity>
              </KeyboardAwareScrollView>
              <KeyboardSpace style={styles.footerContainerStyle}>
                <Button
                  onPress={submitForm}
                  label={
                    i18n?.t("account-details-component.lbl_continue") ??
                    "Continue"
                  }
                  isLoading={isCreatingApplication}
                  disabled={!isValid}
                  disableColor={colors.secondaryButtonColor}
                />
              </KeyboardSpace>
            </View>
          );
        }}
      </Formik>
      <SelectAccountPurposeModal
        initValue={formikRef?.current?.values.purpose}
        onValueChanged={value => {
          setOpenAccountPurposeModal(false);
          formikRef?.current.setFieldValue("accountPurpose", value.label);
        }}
        isVisible={openAccountPurposeModal}
        onClose={() => setOpenAccountPurposeModal(false)}
        style={styles.accountPurposeModalStyles}
      />
      <SelectMonthlyTransactionModal
        initValue={formikRef?.current?.values.estMonthlyTransaction}
        onValueChanged={value => {
          setMonthlyIncome(value);
          setOpenMonthlyTransactionModal(false);
          formikRef?.current.setFieldValue("monthlyIncome", value.label);
        }}
        isVisible={openMonthlyTransactionModal}
        onClose={() => setOpenMonthlyTransactionModal(false)}
        style={styles.monthlyTransactionModalStyles}
      />
      <SelectSourceOfFundModal
        initValue={formikRef?.current?.values.sourceFund}
        onValueChanged={value => {
          setOpenSourceFundModal(false);
          formikRef?.current.setFieldValue("sourceOfFund", value.label);
        }}
        isVisible={openSourceFundModal}
        onClose={() => setOpenSourceFundModal(false)}
        style={styles.sourceOfFundModalStyles}
      />
    </>
  );
};

export default AccountDetailsComponent;
