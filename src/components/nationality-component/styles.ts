import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { NationalityComponentStyles } from '.';

const useMergeStyles = (style?: NationalityComponentStyles): NationalityComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: NationalityComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    contentContainerStyle: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 96,
    },
    labelTextStyle: {
      fontSize: 12,
      lineHeight: 21,
      fontFamily: fonts.medium,
      color: colors.primaryTextColor,
      marginBottom: 3,
      marginTop: 20,
    },
    suffixContainerStyle: {
      paddingHorizontal: 12,
    },
    citizenHeaderTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 24,
      marginTop: 20,
      // marginBottom: 20,
    },
    citizenHeader2TextStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 24,
      marginTop: 20,
      marginBottom: 20,
    },
    citizenMessageTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: '#7F7B82',
    },
    footerContainerStyle: {
      padding: 24,
      backgroundColor: 'rgba(246, 250, 255, 0.8)',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
