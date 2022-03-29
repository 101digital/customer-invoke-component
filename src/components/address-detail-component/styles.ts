import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AddressDetailsComponentStyles } from '.';

const useMergeStyles = (style?: AddressDetailsComponentStyles): AddressDetailsComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: AddressDetailsComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      paddingHorizontal: 24,
    },
    labelTextStyle: {
      fontSize: 12,
      lineHeight: 21,
      fontFamily: fonts.medium,
      color: colors.primaryTextColor,
      marginBottom: 3,
      marginTop: 20,
    },
    optionalTextStyle: {
      color: '#BAB7BB',
    },
    suffixContainerStyle: {
      paddingHorizontal: 12,
    },
    footerContainerStyle: {
      padding: 24,
      backgroundColor: 'rgba(246, 250, 255, 0.8)',
    },
    addressTypeTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 24,
      color: '#000000',
    },
    contentContainerStyle: {
      flex: 1,
      marginBottom: 96,
    },
    checkboxTitleStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: '#000000',
    },
    activeCheckboxStyle: {
      width: 18,
      height: 18,
      borderRadius: 3,
      backgroundColor: colors.secondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inActiveCheckboxStyle: {
      width: 18,
      height: 18,
      borderRadius: 3,
      backgroundColor: '#F4F4F4',
    },
    checkboxContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 23,
      marginBottom: 40,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
