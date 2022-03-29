import { Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
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
import SelectCityModal, {
  SelectCityModalStyles
} from "../sub-components/select-city-modal";
import SelectEmploymentStatusModal, {
  SelectEmploymentStatusModalStyles
} from "./components/select-employment-status-modal";
import SelectNatureWorkModal, {
  SelectNatureWorkModalStyles
} from "./components/select-nature-work-modal";
import SelectOccupationModal, {
  SelectOccupationModalStyles
} from "./components/select-occupation-modal";
import { OtherDetailsData, OtherDetailsSchema } from "./model";
import useMergeStyles from "./styles";

export type OtherDetailsComponentProps = {
  initValue?: OtherDetailsData;
  header: HeaderComponentProps;
  onContinue: () => void;
  style?: OtherDetailsComponentStyles;
};

export type OtherDetailsComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  suffixContainerStyle?: StyleProp<ViewStyle>;
  optionalTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  employmentStatusModalStyles?: SelectEmploymentStatusModalStyles;
  occupationModalStyles?: SelectOccupationModalStyles;
  natureWorkModalStyles?: SelectNatureWorkModalStyles;
  cityModalStyles?: SelectCityModalStyles;
};

const OtherDetailsComponent = ({
  style,
  header,
  initValue,
  onContinue
}: OtherDetailsComponentProps) => {
  const styles: OtherDetailsComponentStyles = useMergeStyles(style);
  const formikRef: any = useRef(null);
  const { colors, i18n } = useContext(ThemeContext);
  const [openEmploymentStatusModal, setOpenEmploymentStatusModal] = useState(
    false
  );
  const [openCityModal, setOpenCityModal] = useState(false);
  const [openOccupationModal, setOpenOccupationModal] = useState(false);
  const [openNatureWorkModal, setOpenNatureWorkModal] = useState(false);
  const { updateOtherDetails, isUpdatedOtherDetails } = useContext(
    OnboardingContext
  );

  useEffect(() => {
    if (isUpdatedOtherDetails) {
      onContinue();
    }
  }, [isUpdatedOtherDetails]);

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
        initialValues={initValue ?? OtherDetailsData.empty()}
        validationSchema={OtherDetailsSchema()}
        onSubmit={updateOtherDetails}
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
                  {i18n?.t("other-details-component.lbl_employment_status") ??
                    "Employment status"}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setOpenEmploymentStatusModal(true);
                  }}
                >
                  <InputField
                    name={"status"}
                    placeholder={
                      i18n?.t(
                        "other-details-component.plh_employment_status"
                      ) ?? "Select employment status"
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
                  {i18n?.t("other-details-component.lbl_occupation") ??
                    "Occupation"}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setOpenOccupationModal(true);
                  }}
                >
                  <InputField
                    name={"occupation"}
                    placeholder={
                      i18n?.t("other-details-component.plh_occupation") ??
                      "Select occupation"
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
                  {i18n?.t("other-details-component.lbl_work") ??
                    "Nature of Work / Business"}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setOpenNatureWorkModal(true);
                  }}
                >
                  <InputField
                    name={"companyType"}
                    placeholder={
                      i18n?.t("other-details-component.plh_work") ??
                      "Select nature of work / business"
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
                  {i18n?.t("other-details-component.lbl_employer") ??
                    "Name of Employer / Business"}
                </Text>
                <InputField
                  name={"companyName"}
                  placeholder={
                    i18n?.t("other-details-component.plh_employer") ??
                    "Enter business address"
                  }
                  maxLength={100}
                />
                <View style={innerStyles.rowItems}>
                  <View style={innerStyles.cityContainer}>
                    <Text style={styles.labelTextStyle}>
                      {i18n?.t("other-details-component.lbl_city") ?? "City"}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setOpenCityModal(true);
                      }}
                    >
                      <InputField
                        name={"city"}
                        placeholder={
                          i18n?.t("other-details-component.plh_city") ??
                          "Select city"
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
                  </View>
                  <View style={innerStyles.zipcodeContainer}>
                    <Text style={styles.labelTextStyle}>
                      {i18n?.t("other-details-component.lbl_zip_code") ??
                        "ZIP Code"}
                    </Text>
                    <InputField
                      name={"postcode"}
                      placeholder={
                        i18n?.t("other-details-component.plh_zip_code") ??
                        "ZIP Code"
                      }
                      maxLength={10}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
              <KeyboardSpace style={styles.footerContainerStyle}>
                <Button
                  onPress={submitForm}
                  label={
                    i18n?.t("other-details-component.lbl_continue") ??
                    "Continue"
                  }
                  disabled={!isValid}
                  disableColor={colors.secondaryButtonColor}
                />
              </KeyboardSpace>
            </View>
          );
        }}
      </Formik>
      <SelectEmploymentStatusModal
        initValue={formikRef?.current?.values.status}
        onValueChanged={value => {
          setOpenEmploymentStatusModal(false);
          formikRef?.current.setFieldValue("status", value.label);
        }}
        isVisible={openEmploymentStatusModal}
        onClose={() => setOpenEmploymentStatusModal(false)}
        style={styles.employmentStatusModalStyles}
      />
      <SelectCityModal
        header={{
          data: {
            id: "selection-city",
            title: "City",
            subTitle: "Select your city",
            progress: 0
          }
        }}
        initValue={formikRef?.current?.values.city}
        isVisible={openCityModal}
        onClose={() => setOpenCityModal(false)}
        onSelected={value => {
          setOpenCityModal(false);
          formikRef?.current?.setFieldValue("city", value.name);
        }}
        style={styles.cityModalStyles}
      />
      <SelectOccupationModal
        initValue={formikRef?.current?.values.occupation}
        isVisible={openOccupationModal}
        onClose={() => setOpenOccupationModal(false)}
        onSelected={value => {
          setOpenOccupationModal(false);
          formikRef?.current?.setFieldValue("occupation", value.name);
        }}
        style={styles.occupationModalStyles}
      />
      <SelectNatureWorkModal
        initValue={formikRef?.current?.values.work}
        isVisible={openNatureWorkModal}
        onClose={() => setOpenNatureWorkModal(false)}
        onSelected={value => {
          setOpenNatureWorkModal(false);
          formikRef?.current?.setFieldValue("companyType", value.name);
        }}
        style={styles.natureWorkModalStyles}
      />
    </>
  );
};
const innerStyles = StyleSheet.create({
  rowItems: {
    flexDirection: "row"
  },
  cityContainer: {
    flex: 2,
    marginRight: 10
  },
  zipcodeContainer: {
    flex: 1
  }
});

export default OtherDetailsComponent;
