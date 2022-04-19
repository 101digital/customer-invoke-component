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
import { CustomerInvokeContext } from "../../context/onboarding-context";
import HeaderComponent, { HeaderComponentProps } from "../header-component";
import AlertModal, { AlertModalStyles } from "../sub-components/alert-modal";
import KeyboardSpace from "../sub-components/keyboard-space";
import RadioGroupComponent from "../sub-components/radio-group";
import SelectNationalityModal, {
  SelectNationalityModalStyles
} from "./components/select-nationality-modal";
import { NationalityData, NationalityDataSchema } from "./model";
import useMergeStyles from "./styles";

export type NationalityComponentProps = {
  initData?: NationalityData;
  header: HeaderComponentProps;
  onContinue: () => void;
  style?: NationalityComponentStyles;
};

export type NationalityComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  suffixContainerStyle?: StyleProp<ViewStyle>;
  citizenHeaderTextStyle?: StyleProp<TextStyle>;
  citizenMessageTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  nationalityModalStyles?: SelectNationalityModalStyles;
  restrictAlertModalStyles?: AlertModalStyles;
};

const NationalityComponent = ({
  style,
  header,
  initData,
  onContinue
}: NationalityComponentProps) => {
  const styles: NationalityComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const [openNationalityModal, setOpenNationalityModal] = useState(false);
  const [isShowLimitModal, setShowLimitModal] = useState(false);
  const _citizenOptions = [
    { id: "no", label: "No. I’m not a U.S citizen" },
    { id: "yes", label: "Yes. I’m a U.S citizen" }
  ];
  const formikRef: any = useRef(null);
  const {
    updateNationality,
    isUpdatedNationality,
    isUpdatingNationality
  } = useContext(CustomerInvokeContext);

  useEffect(() => {
    if (isUpdatedNationality) {
      onContinue();
    }
  }, [isUpdatedNationality]);

  useEffect(() => {
    setTimeout(() => {
      formikRef?.current?.validateForm();
    }, 0);
  }, [initData]);

  return (
    <>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={initData ?? NationalityData.empty()}
        validationSchema={NationalityDataSchema()}
        onSubmit={values => {
          if (values.nationality !== "Filipino" || values.isCitizen === "yes") {
            setShowLimitModal(true);
          } else {
            updateNationality(values);
          }
        }}
      >
        {({ isValid, submitForm, values, setFieldValue }) => {
          return (
            <View style={styles.containerStyle}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.contentContainerStyle}
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={50}
              >
                <TouchableOpacity
                  onPress={() => {
                    // auto fill sample data
                    setFieldValue("placeOfBirth", "Singapore");
                    setFieldValue("nationality", "Filipino");
                    setFieldValue("isCitizen", "no");
                    setTimeout(() => {
                      formikRef?.current?.validateForm();
                    }, 0);
                  }}
                >
                  <HeaderComponent {...header} />
                </TouchableOpacity>
                <Text style={styles.labelTextStyle}>
                  {i18n?.t("nationality-component.lbl_birth_place") ??
                    "Place of birth"}
                </Text>
                <InputField
                  name="placeOfBirth"
                  placeholder={
                    i18n?.t("nationality-component.plh_birth_place") ??
                    "Enter place of birth"
                  }
                  maxLength={100}
                  style={{
                    contentContainerStyle: {
                      borderWidth: 1,
                      borderRadius: 5,
                      borderBottomWidth: 1,
                      backgroundColor: "#fff"
                    }
                  }}
                />
                <Text style={styles.labelTextStyle}>
                  {i18n?.t("nationality-component.lbl_nationality") ??
                    "Nationality"}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setOpenNationalityModal(true);
                  }}
                >
                  <InputField
                    name="nationality"
                    placeholder={
                      i18n?.t("nationality-component.plh_nationality") ??
                      "Select nationality"
                    }
                    pointerEvents="none"
                    editable={false}
                    suffixIcon={
                      <View style={styles.suffixContainerStyle}>
                        <ArrowDownIcon width={24} height={24} />
                      </View>
                    }
                    style={{
                      contentContainerStyle: {
                        borderWidth: 1,
                        borderRadius: 5,
                        borderBottomWidth: 1,
                        backgroundColor: "#fff"
                      }
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.citizenHeaderTextStyle}>
                  {i18n?.t("nationality-component.lbl_citizen") ??
                    "Are you a U.S citizen?"}
                </Text>
                <Text style={styles.citizenMessageTextStyle}>
                  {i18n?.t("nationality-component.lbl_citizen_description") ??
                    "We ask you to comply with the Foreign Account Tax Compliance Act (FATCA)"}
                </Text>
                <RadioGroupComponent
                  variant="inner"
                  style={{
                    titleTextStyle: {
                      fontSize: 14
                    }
                  }}
                  value={
                    values.isCitizen !== undefined
                      ? values.isCitizen === "no"
                        ? _citizenOptions[0]
                        : _citizenOptions[1]
                      : undefined
                  }
                  data={_citizenOptions}
                  onChangeValue={value => {
                    setFieldValue("isCitizen", value.id);
                  }}
                />
              </KeyboardAwareScrollView>
              <KeyboardSpace style={styles.footerContainerStyle}>
                <Button
                  onPress={submitForm}
                  label={
                    i18n?.t("nationality-component.lbl_continue") ?? "Continue"
                  }
                  isLoading={isUpdatingNationality}
                  disabled={!isValid}
                  disableColor={colors.secondaryButtonColor}
                />
              </KeyboardSpace>
            </View>
          );
        }}
      </Formik>
      <SelectNationalityModal
        initValue={formikRef?.current?.values.nationality}
        isVisible={openNationalityModal}
        onClose={() => setOpenNationalityModal(false)}
        onSelected={value => {
          setOpenNationalityModal(false);
          formikRef?.current?.setFieldValue("nationality", value.name);
        }}
        style={styles.nationalityModalStyles}
      />
      <AlertModal
        isVisible={isShowLimitModal}
        title={i18n?.t("nationality-component.lbl_error_title") ?? "Oops!"}
        message={
          i18n?.t("nationality-component.lbl_error_message") ??
          "Sorry! UnionDigital is only availale for Filipinos and Non-US citizens. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
        onConfirmed={() => setShowLimitModal(false)}
        style={styles.restrictAlertModalStyles}
      />
    </>
  );
};

export default NationalityComponent;
