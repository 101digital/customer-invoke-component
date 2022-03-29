import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectMonthlyTransactionModalStyles } from '.';

const useMergeStyles = (
  style?: SelectMonthlyTransactionModalStyles
): SelectMonthlyTransactionModalStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: SelectMonthlyTransactionModalStyles = StyleSheet.create({
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
