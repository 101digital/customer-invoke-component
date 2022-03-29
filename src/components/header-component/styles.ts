import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { HeaderComponentStyles } from '.';

const useMergeStyles = (style?: HeaderComponentStyles): HeaderComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: HeaderComponentStyles = StyleSheet.create({
    containerStyle: {
      marginBottom: 20,
    },
    headerTitleTextStyle: {
      lineHeight: 36,
      color: colors.primaryColor,
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    subTitleTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 24,
      color: colors.secondaryTextColor,
      marginTop: 20,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
