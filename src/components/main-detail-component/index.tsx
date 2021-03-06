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
import {
  Button,
  InputField,
  ThemeContext,
  ErrorModal
} from "react-native-theme-component";
import HeaderComponent, { HeaderComponentProps } from "../header-component";
import { MainDetailsData, MainDetailsSchema } from "./model";
import DatePicker from "react-native-date-picker";
import useMergeStyles from "./styles";
import { ArrowDownIcon, CalendarIcon, InfoIcon } from "../../assets/icons";
import moment from "moment";
import SelectGenderModal, {
  SelectGenderModalStyles
} from "./components/select-gender-modal";
import SelectCivilModal, {
  SelectCivilModalStyles
} from "./components/select-civil-modal";
import KeyboardSpace from "../sub-components/keyboard-space";
import { CustomerInvokeContext } from "../../context/onboarding-context";

export type MainDetailComponentProps = {
  initData?: MainDetailsData;
  header: HeaderComponentProps;
  onContinue: () => void;
  style?: MainDetailComponentStyles;
  firstName?: string;
  lastName?: string;
};

export type MainDetailComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  suffixContainerStyle?: StyleProp<ViewStyle>;
  optionalTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  // sub component
  selectGenderModalStyle?: SelectGenderModalStyles;
  selectCivilModalStyle?: SelectCivilModalStyles;
};

const MainDetailComponent = ({
  style,
  header,
  onContinue,
  initData,
  firstName,
  lastName
}: MainDetailComponentProps) => {
  const styles: MainDetailComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const [date, setDate] = useState<Date | undefined>();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openGenderModal, setOpenGenderModal] = useState(false);
  const [openCivilModal, setOpenCivilModal] = useState(false);
  const [processModelShow, setProcessModelShow] = useState(false);

  const {
    addMainDetails,
    isUpdatingMainDetails,
    isUpdatedMainDetails
  } = useContext(CustomerInvokeContext);

  const formikRef: any = useRef(null);

  useEffect(() => {
    if (!initData) {
      setProcessModelShow(true);
    }
  }, [initData]);

  useEffect(() => {
    if (isUpdatedMainDetails) {
      onContinue();
    }
  }, [isUpdatedMainDetails]);

  useEffect(() => {
    setTimeout(() => {
      formikRef?.current?.validateForm();
    }, 0);
  }, []);

  useEffect(() => {
    if (date) {
      formikRef?.current.setFieldValue(
        "dateOfBirth",
        moment(date).format("DD / MM / YYYY")
      );
    }
  }, [date]);

  return (
    <>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={
          initData ?? MainDetailsData.empty(undefined, undefined, undefined)
        }
        validationSchema={MainDetailsSchema()}
        onSubmit={addMainDetails}
      >
        {({ isValid, submitForm, setFieldValue }) => (
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
                  /// Auto fill sample data
                  setFieldValue("firstName", "Sharmal");
                  setFieldValue("middleName", "Peter");
                  setFieldValue("lastName", "Perera");
                  setFieldValue("dateOfBirth", "12 / 07 /1991");
                  setFieldValue("gender", "Male");
                  setFieldValue("maritalStatus", "Single");
                  setFieldValue("email", "sharmal@101digital.io");
                  setTimeout(() => {
                    formikRef?.current?.validateForm();
                  }, 0);
                }}
              >
                <HeaderComponent {...header} />
              </TouchableOpacity>
              <Text style={styles.labelTextStyle}>
                {i18n?.t("customer_invoke_component.lbl_first_name") ??
                  "First name"}
              </Text>
              <InputField
                name="firstName"
                placeholder={
                  i18n?.t("customer_invoke_component.lbl_first_name") ??
                  "Enter first name"
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
                {i18n?.t("customer_invoke_component.lbl_middle_name") ??
                  "Middle name"}
              </Text>
              <InputField
                name="middleName"
                placeholder={
                  i18n?.t("customer_invoke_component.plh_middle_name") ??
                  "Enter middle name"
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
                {i18n?.t("customer_invoke_component.lbl_last_name") ??
                  "Last name"}
              </Text>
              <InputField
                name="lastName"
                placeholder={
                  i18n?.t("customer_invoke_component.plh_last_name") ??
                  "Enter last name"
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
                {i18n?.t("customer_invoke_component.lbl_dob") ??
                  "Date of Birth"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setOpenDatePicker(true)}
              >
                <InputField
                  name="dateOfBirth"
                  placeholder={
                    i18n?.t("customer_invoke_component.plh_dob") ??
                    "MM / DD / YYYY"
                  }
                  pointerEvents="none"
                  editable={false}
                  suffixIcon={
                    <View style={styles.suffixContainerStyle}>
                      <CalendarIcon width={24} height={24} />
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
              <Text style={styles.labelTextStyle}>
                {i18n?.t("customer_invoke_component.lbl_c_status") ??
                  "Civil status"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setOpenCivilModal(true)}
              >
                <InputField
                  name="maritalStatus"
                  placeholder={
                    i18n?.t("customer_invoke_component.plh_c_status") ??
                    "Select civil status"
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
              <Text style={styles.labelTextStyle}>
                {i18n?.t("customer_invoke_component.lbl_gender") ?? "Gender"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setOpenGenderModal(true)}
              >
                <InputField
                  name="gender"
                  placeholder={
                    i18n?.t("customer_invoke_component.plh_gender") ??
                    "Select gender"
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
              <Text style={styles.labelTextStyle}>
                {i18n?.t("customer_invoke_component.lbl_email_address") ??
                  "Email addres"}
              </Text>
              <InputField
                autoCapitalize="none"
                name="email"
                placeholder="your@email.com"
                style={{
                  contentContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 5,
                    borderBottomWidth: 1,
                    backgroundColor: "#fff"
                  }
                }}
              />
            </KeyboardAwareScrollView>
            <KeyboardSpace style={styles.footerContainerStyle}>
              <Button
                onPress={submitForm}
                label={
                  i18n?.t("customer_invoke_component.lbl_continue") ??
                  "Continue"
                }
                isLoading={isUpdatingMainDetails}
                disabled={!isValid}
                disableColor={colors.secondaryButtonColor}
              />
            </KeyboardSpace>
          </View>
        )}
      </Formik>
      <DatePicker
        modal
        open={openDatePicker}
        date={date ?? new Date()}
        onConfirm={value => {
          setOpenDatePicker(false);
          setDate(value);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
        title={
          i18n?.t("customer_invoke_component.lbl_picker_title") ??
          "Date of Birth"
        }
        androidVariant="nativeAndroid"
        mode="date"
        maximumDate={new Date()}
        confirmText={
          i18n?.t("customer_invoke_component.lbl_picker_confirm") ?? "Select"
        }
      />
      <SelectGenderModal
        initValue={formikRef?.current?.values.gender}
        onValueChanged={value => {
          setOpenGenderModal(false);
          formikRef?.current.setFieldValue("gender", value.label);
        }}
        isVisible={openGenderModal}
        onClose={() => setOpenGenderModal(false)}
        style={styles.selectGenderModalStyle}
      />
      <SelectCivilModal
        initValue={formikRef?.current?.values.civil}
        onValueChanged={value => {
          setOpenCivilModal(false);
          formikRef?.current.setFieldValue("maritalStatus", value.label);
        }}
        isVisible={openCivilModal}
        onClose={() => setOpenCivilModal(false)}
        style={styles.selectCivilModalStyle}
      />
      <ErrorModal
        error={{
          title:
            i18n?.t("customer_invoke_component.lbl_continue_process") ??
            "Continue where you left off",
          message:
            i18n?.t("customer_invoke_component.msg_continue_process") ??
            "We conveniently save your information should you need more time to complete your UD Pitaka account opening. Simply re-login to your account to continue your application."
        }}
        isShowModel={processModelShow}
        isFullWidth={true}
        isShowClose={false}
        onClose={() => setProcessModelShow(false)}
        leftIcon={<InfoIcon width={60} height={60} />}
        style={{
          alertStyle: {
            headerStyle: {
              marginTop: 5,
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center"
            },
            leftIconStyle: { marginLeft: -20 },
            titleTextStyle: {
              fontSize: 16,
              // flex: 1,
              paddingVertical: 15,
              color: "#5E0CBC",
              paddingLeft: 0,
              textAlign: "center",
              marginLeft: 20,
              fontWeight: "700"
            },
            bodyStyle: {
              width: 300,
              alignItems: "center",
              alignSelf: "center"
            },
            messageTextStyle: {
              fontSize: 14,
              color: "#1D1C1D",
              textAlign: "center"
            },
            modalStyle: { width: "95%", alignSelf: "center" },
            containerStyle: { paddingVertical: 10 },
            footerStyle: {
              marginVertical: 30
            }
          }
        }}
      />
    </>
  );
};

export default MainDetailComponent;
