import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectSourceOfFundModalStyles } from '.';

const useMergeStyles = (style?: SelectSourceOfFundModalStyles): SelectSourceOfFundModalStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: SelectSourceOfFundModalStyles = StyleSheet.create({
    containerStyle: {
      padding: 25,
    },
    modalTitleStyle: {
      marginTop: 21,
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 27,
      color: colors.primaryTextColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
