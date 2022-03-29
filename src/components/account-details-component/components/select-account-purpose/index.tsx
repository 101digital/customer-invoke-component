import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button, ThemeContext } from 'react-native-theme-component';
import RadioGroupComponent, { RadioData } from '../../../sub-components/radio-group';
import useMergeStyles from './styles';

export type SelectAccountPurposeModalProps = {
  isVisible: boolean;
  onClose: () => void;
  initValue?: string;
  onValueChanged: (value: RadioData) => void;
  style?: SelectAccountPurposeModalStyles;
};

export type SelectAccountPurposeModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const SelectAccountPurposeModal = ({
  style,
  isVisible,
  onClose,
  onValueChanged,
  initValue,
}: SelectAccountPurposeModalProps) => {
  const styles: SelectAccountPurposeModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const _status = [
    { id: '1', label: 'Business' },
    { id: '2', label: 'Donation/Gifts/Aid' },
    { id: '3', label: 'Inheritance' },
    { id: '4', label: 'Pension/Retirement' },
    { id: '5', label: 'Personal Savings' },
    { id: '6', label: 'Salary' },
    { id: '7', label: 'Others' },
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
        <Text style={styles.modalTitleStyle}>{'Select source of funds'}</Text>
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
          disabled={value === undefined}
          disableColor={colors.secondaryButtonColor}
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

export default SelectAccountPurposeModal;
