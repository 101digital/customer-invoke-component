import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { StepData } from '../../types';
import useMergeStyles from './styles';

export type HeaderComponentProps = {
  data: StepData;
  style?: HeaderComponentStyles;
};

export type HeaderComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleTextStyle?: StyleProp<TextStyle>;
  subTitleTextStyle?: StyleProp<TextStyle>;
};

const HeaderComponent = ({ style, data }: HeaderComponentProps) => {
  const styles: HeaderComponentStyles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.headerTitleTextStyle}>{data.title}</Text>
      <Text style={styles.subTitleTextStyle}>{data.subTitle}</Text>
    </View>
  );
};

export default HeaderComponent;
