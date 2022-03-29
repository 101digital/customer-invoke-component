import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button, ThemeContext } from 'react-native-theme-component';
import RadioGroupComponent, { RadioData } from '../../../sub-components/radio-group';
import useMergeStyles from './styles';

export type SelectEmploymentStatusModalProps = {
  isVisible: boolean;
  initValue?: string;
  onClose: () => void;
  onValueChanged: (value: RadioData) => void;
  style?: SelectEmploymentStatusModalStyles;
};

export type SelectEmploymentStatusModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const SelectEmploymentStatusModal = ({
  style,
  isVisible,
  onClose,
  onValueChanged,
  initValue,
}: SelectEmploymentStatusModalProps) => {
  const styles: SelectEmploymentStatusModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const _status = [
    { id: '1', label: 'Student' },
    { id: '2', label: 'Employee' },
    { id: '3', label: 'Freelance' },
    { id: '4', label: 'Contractual' },
    { id: '5', label: 'Self-employed' },
    { id: '6', label: 'Retired' },
    { id: '7', label: 'Unemployed' },
  ];
  const [value, setValue] = useState<RadioData | undefined>(undefined);

  useEffect(() => {
    if (initValue) {
      setValue(_status.find((s) => s.id === initValue || s.label === initValue));
    }
  }, [initValue]);

  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>{'Select employment status'}</Text>
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
          disabled={value === undefined}
          label="Select"
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

export default SelectEmploymentStatusModal;
