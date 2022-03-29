import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { OnboardingComponentStyles } from '.';

const useMergeStyles = (style?: OnboardingComponentStyles): OnboardingComponentStyles => {
  const { colors } = useContext(ThemeContext);

  const defaultStyles: OnboardingComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    progressBarStyle: {
      height: 5,
      width: '100%',
    },
    activeBarStyle: {
      height: '100%',
      backgroundColor: colors.secondaryColor,
    },
    backButtonContainerStyle: {
      padding: 15,
      marginLeft: 12,
      marginTop: 26,
      marginBottom: 8,
      width: 100,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
