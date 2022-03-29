import { onboardingColors } from './../../../../assets/colors';
import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectBarangayModalStyles } from '.';

const useMergeStyles = (style?: SelectBarangayModalStyles): SelectBarangayModalStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: SelectBarangayModalStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      backgroundColor: onboardingColors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    backButtonContainerStyle: {
      padding: 15,
      marginLeft: 12,
      marginBottom: 8,
    },
    contentContainerStyle: {
      flex: 1,
      paddingHorizontal: 24,
    },
    barangayListStyle: {
      marginBottom: 96,
      marginTop: 8,
    },
    sectionTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 12,
      lineHeight: 24,
      color: '#7F7B82',
      marginTop: 12,
      marginBottom: 8,
    },
    barangayTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 16,
      lineHeight: 26,
      color: colors.primaryTextColor,
    },
    footerContainerStyle: {
      paddingBottom: 24,
      paddingTop: 18,
      paddingHorizontal: 24,
      backgroundColor: 'rgba(246, 250, 255, 0.8)',
      shadowColor: 'grey',
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 10,
      elevation: 1,
    },
    emptyResultTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'center',
      marginTop: 79,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
