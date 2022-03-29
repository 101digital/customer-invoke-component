import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { MainDetailComponentStyles } from '.';

const useMergeStyles = (style?: MainDetailComponentStyles): MainDetailComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: MainDetailComponentStyles = StyleSheet.create({
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
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
