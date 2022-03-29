import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button, ThemeContext } from 'react-native-theme-component';
import RadioGroupComponent, { RadioData } from '../../../sub-components/radio-group';
import useMergeStyles from './styles';

export type SelectMonthlyTransactionModalProps = {
  isVisible: boolean;
  initValue?: string;
  onClose: () => void;
  onValueChanged: (value: RadioData) => void;
  style?: SelectMonthlyTransactionModalStyles;
};

export type SelectMonthlyTransactionModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const SelectMonthlyTransactionModal = ({
  style,
  isVisible,
  onClose,
  onValueChanged,
  initValue,
}: SelectMonthlyTransactionModalProps) => {
  const styles: SelectMonthlyTransactionModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const _status = [
    { id: '1', label: 'Up to PhP50,000' },
    { id: '2', label: 'PhP50,001 to PhP100,000' },
    { id: '3', label: 'PhP100,001 to PhP250,000' },
    { id: '4', label: 'PhP250,001 to PhP500,000' },
    { id: '5', label: 'Greater than PhP500,000' },
  ];
  const [value, setValue] = useState<RadioData | undefined>(undefined);

  useEffect(() => {
    if (initValue) {
      setValue(_status.find((c) => c.id === initValue || c.label === initValue));
    }
  }, [initValue]);

  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>{'Estimated monthly transaction'}</Text>
        <RadioGroupComponent
          value={value}
          data={_status}
          onChangeValue={(v) => {
            setValue(v);
          }}
        />
        <Button
          onPress={() => {
            onValueChanged(value!);
          }}
          label="Select"
          disableColor={colors.secondaryButtonColor}
          disabled={value === undefined}
          style={{
            primaryContainerStyle: {
              marginTop: 30,
            },
          }}
        />
      </View>
    </BottomSheet>
  );
};

export default SelectMonthlyTransactionModal;
