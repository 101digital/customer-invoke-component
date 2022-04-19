import { FieldArray, Formik } from "formik";
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
import { ArrowDownIcon, TickIcon } from "../../assets/icons";
import HeaderComponent, { HeaderComponentProps } from "../header-component";
import KeyboardSpace from "../sub-components/keyboard-space";
import SelectBarangayModal, {
  SelectBarangayModalStyles
} from "./components/select-barangay-modal";
import SelectCityModal from "../sub-components/select-city-modal";
import SelectCountryModal, {
  SelectCountryModalStyles
} from "./components/select-country-modal";
import SelectProvinceModal, {
  SelectProvinceModalStyles
} from "./components/select-province-modal";
import SelectRegionModal, {
  SelectRegionModalStyles
} from "./components/select-region-modal";
import { AddressDetailsData, AddressDetailsSchema } from "./model";
import useMergeStyles from "./styles";
import { SelectCivilModalStyles } from "../main-detail-component/components/select-civil-modal";
import { CustomerInvokeContext } from "../../context/onboarding-context";

export type AddressDetailsComponentProps = {
  initValue?: AddressDetailsData[];
  header: HeaderComponentProps;
  onContinue: () => void;
  style?: AddressDetailsComponentStyles;
};

export type AddressDetailsComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  suffixContainerStyle?: StyleProp<ViewStyle>;
  optionalTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  addressTypeTextStyle?: StyleProp<TextStyle>;
  checkboxContainerStyle?: StyleProp<ViewStyle>;
  checkboxTitleStyle?: StyleProp<TextStyle>;
  activeCheckboxStyle?: StyleProp<ViewStyle>;
  inActiveCheckboxStyle?: StyleProp<ViewStyle>;
  countryModalStyles?: SelectCountryModalStyles;
  regionModalStyles?: SelectRegionModalStyles;
  provinceModalStyles?: SelectProvinceModalStyles;
  cityModalStyles?: SelectCivilModalStyles;
  barangayModalStyles?: SelectBarangayModalStyles;
};

const AddressDetailsComponent = ({
  style,
  header,
  initValue,
  onContinue
}: AddressDetailsComponentProps) => {
  const styles: AddressDetailsComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const formikRef: any = useRef(null);
  const [isPresentAsPermanent, setPresentAsPermanent] = useState(true);
  const [openCountryModal, setOpenCountryModal] = useState<number | undefined>(
    undefined
  );
  const [openRegionModal, setOpenRegionModal] = useState<number | undefined>(
    undefined
  );
  const [openProvinceModal, setOpenProvinceModal] = useState<
    number | undefined
  >(undefined);
  const [openCityModal, setOpenCityModal] = useState<number | undefined>(
    undefined
  );
  const [openBarangayModal, setOpenBarangayModal] = useState<
    number | undefined
  >(undefined);
  const {
    updateAddressDetails,
    isUpdatingAddressDetails,
    isUpdatedAddressDetails
  } = useContext(CustomerInvokeContext);

  useEffect(() => {
    if (isUpdatedAddressDetails) {
      onContinue();
    }
  }, [isUpdatedAddressDetails]);

  useEffect(() => {
    setTimeout(() => {
      formikRef?.current?.validateForm();
    }, 0);
  }, []);

  const _setFieldValue = (index: number, name: string, value: string) => {
    formikRef?.current?.setFieldValue(_valueName(index, name), value);
  };

  const _valueName = (index: number, name: string) =>
    `addresses[${index}].${name}`;

  const _getFieldValue = (index?: number, name?: string) => {
    if (index === undefined || name === undefined) {
      return undefined;
    }
    return formikRef?.current?.values["addresses"][index][name];
  };

  return (
    <>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={{
          addresses: initValue ?? [AddressDetailsData.empty(1)]
        }}
        validationSchema={AddressDetailsSchema()}
        onSubmit={values => {
          updateAddressDetails(isPresentAsPermanent, values.addresses);
        }}
      >
        {({ isValid, submitForm, values }) => {
          values.addresses;
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
                <FieldArray
                  name="addresses"
                  render={({ remove, push }) => (
                    <View>
                      {values.addresses.map((address, index) => {
                        return (
                          <View key={address.addressType}>
                            <Text style={styles.addressTypeTextStyle}>
                              {address.addressType === 1
                                ? "Present address"
                                : "Permanent address"}
                            </Text>
                            <Text style={styles.labelTextStyle}>
                              {i18n?.t("address-detail.lbl_country") ??
                                "Country"}
                            </Text>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => {
                                setOpenCountryModal(index);
                              }}
                            >
                              <InputField
                                name={_valueName(index, "country")}
                                placeholder={
                                  i18n?.t("address-detail.plh_country") ??
                                  "Country"
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
                              {i18n?.t("address-detail.lbl_country") ??
                                "Region"}
                            </Text>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => {
                                setOpenRegionModal(index);
                              }}
                            >
                              <InputField
                                name={_valueName(index, "region")}
                                placeholder={
                                  i18n?.t("address-detail.plh_country") ??
                                  "Region"
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
                              {i18n?.t("address-detail.lbl_province") ??
                                "Province"}
                            </Text>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => {
                                setOpenProvinceModal(index);
                              }}
                            >
                              <InputField
                                name={_valueName(index, "province")}
                                placeholder={
                                  i18n?.t("address-detail.plh_province") ??
                                  "Province"
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
                            <View style={innerStyles.rowItems}>
                              <View style={innerStyles.cityContainer}>
                                <Text style={styles.labelTextStyle}>
                                  {i18n?.t("address-detail.lbl_city") ??
                                    "City / Municipality"}
                                </Text>
                                <TouchableOpacity
                                  activeOpacity={0.8}
                                  onPress={() => {
                                    setOpenCityModal(index);
                                  }}
                                >
                                  <InputField
                                    name={_valueName(index, "city")}
                                    placeholder={
                                      i18n?.t("address-detail.plh_city") ??
                                      "City / Municipality"
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
                              </View>
                              <View style={innerStyles.zipcodeContainer}>
                                <Text style={styles.labelTextStyle}>
                                  {i18n?.t("address-detail.lbl_zipcode") ??
                                    "ZIP Code"}
                                </Text>
                                <InputField
                                  name={_valueName(index, "postcode")}
                                  placeholder={
                                    i18n?.t("address-detail.plh_zipcode") ??
                                    "ZIP Code"
                                  }
                                  maxLength={10}
                                  style={{
                                    contentContainerStyle: {
                                      borderWidth: 1,
                                      borderRadius: 5,
                                      borderBottomWidth: 1,
                                      backgroundColor: "#fff"
                                    }
                                  }}
                                />
                              </View>
                            </View>
                            <Text style={styles.labelTextStyle}>
                              {i18n?.t("address-detail.lbl_barangay") ??
                                "Barangay"}
                            </Text>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => {
                                setOpenBarangayModal(index);
                              }}
                            >
                              <InputField
                                name={_valueName(index, "line3")}
                                placeholder={
                                  i18n?.t("address-detail.plh_barangay") ??
                                  "Barangay"
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
                              {i18n?.t("address-detail.lbl_street") ??
                                "Street name"}{" "}
                              <Text style={styles.optionalTextStyle}>
                                {i18n?.t("address-detail.lbl_optional") ??
                                  "(Optional)"}
                              </Text>
                            </Text>
                            <InputField
                              name={_valueName(index, "line2")}
                              placeholder={
                                i18n?.t("address-detail.plh_street") ??
                                "Street name"
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
                              {i18n?.t("address-detail.lbl_subdiv") ??
                                "Subdivision / Village / Building name"}{" "}
                              <Text style={styles.optionalTextStyle}>
                                {i18n?.t("address-detail.lbl_optional") ??
                                  "(Optional)"}
                              </Text>
                            </Text>
                            <InputField
                              name={_valueName(index, "buildingName")}
                              placeholder={
                                i18n?.t("address-detail.plh_subdiv") ??
                                "Subdivision / Village / Building name"
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
                              {i18n?.t("address-detail.lbl_house") ??
                                "House / Lot / Room number"}{" "}
                              <Text style={styles.optionalTextStyle}>
                                {i18n?.t("address-detail.lbl_optional") ??
                                  "(Optional)"}
                              </Text>
                            </Text>
                            <InputField
                              name={_valueName(index, "line1")}
                              placeholder={
                                i18n?.t("address-detail.plh_house") ??
                                "House / Lot / Room number"
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
                            {index === 0 && (
                              <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                  if (isPresentAsPermanent) {
                                    push(AddressDetailsData.empty(2));
                                  } else {
                                    remove(1);
                                  }
                                  setPresentAsPermanent(!isPresentAsPermanent);
                                }}
                                style={styles.checkboxContainerStyle}
                              >
                                <Text style={styles.checkboxTitleStyle}>
                                  {i18n?.t(
                                    "address-detail.lbl_payment_address"
                                  ) ??
                                    "Use this address as my permanent address"}
                                </Text>
                                <View
                                  style={
                                    isPresentAsPermanent
                                      ? styles.activeCheckboxStyle
                                      : styles.inActiveCheckboxStyle
                                  }
                                >
                                  {isPresentAsPermanent && (
                                    <TickIcon width={12} height={12} />
                                  )}
                                </View>
                              </TouchableOpacity>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  )}
                />
              </KeyboardAwareScrollView>
              <KeyboardSpace style={styles.footerContainerStyle}>
                <Button
                  onPress={submitForm}
                  label={i18n?.t("address-detail.lbl_continue") ?? "Continue"}
                  isLoading={isUpdatingAddressDetails}
                  disabled={!isValid}
                  disableColor={colors.secondaryButtonColor}
                />
              </KeyboardSpace>
            </View>
          );
        }}
      </Formik>
      <SelectCountryModal
        initValue={_getFieldValue(openCountryModal, "country")}
        isVisible={openCountryModal !== undefined}
        onClose={() => setOpenCountryModal(undefined)}
        onSelected={country => {
          const _index = openCountryModal;
          setOpenCountryModal(undefined);
          _setFieldValue(_index!, "country", country.attributes.name);
        }}
        style={styles.countryModalStyles}
      />
      <SelectRegionModal
        initValue={_getFieldValue(openRegionModal, "region")}
        isVisible={openRegionModal !== undefined}
        onClose={() => setOpenRegionModal(undefined)}
        onSelected={value => {
          const _index = openRegionModal;
          setOpenRegionModal(undefined);
          _setFieldValue(_index!, "region", value.name);
        }}
        style={styles.regionModalStyles}
      />
      <SelectProvinceModal
        initValue={_getFieldValue(openProvinceModal, "province")}
        isVisible={openProvinceModal !== undefined}
        onClose={() => setOpenProvinceModal(undefined)}
        onSelected={value => {
          const _index = openProvinceModal;
          setOpenProvinceModal(undefined);
          _setFieldValue(_index!, "province", value.name);
        }}
        style={styles.provinceModalStyles}
      />
      <SelectCityModal
        header={{
          data: {
            id: "selection-city",
            title: "City / Municipality",
            subTitle: "Select your city / municipality.",
            progress: 0
          }
        }}
        initValue={_getFieldValue(openCityModal, "city")}
        isVisible={openCityModal !== undefined}
        onClose={() => setOpenCityModal(undefined)}
        onSelected={value => {
          const _index = openCityModal;
          setOpenCityModal(undefined);
          _setFieldValue(_index!, "city", value.name);
        }}
        style={styles.cityModalStyles}
      />
      <SelectBarangayModal
        initValue={_getFieldValue(openBarangayModal, "line3")}
        isVisible={openBarangayModal !== undefined}
        onClose={() => setOpenBarangayModal(undefined)}
        onSelected={value => {
          const _index = openBarangayModal;
          setOpenBarangayModal(undefined);
          _setFieldValue(_index!, "line3", value.name);
        }}
        style={styles.barangayModalStyles}
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

export default AddressDetailsComponent;
