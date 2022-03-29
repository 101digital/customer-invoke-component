import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button, ThemeContext } from 'react-native-theme-component';
import RadioGroupComponent, { RadioData } from '../../../sub-components/radio-group';
import useMergeStyles from './styles';

export type SelectSourceOfFundModalProps = {
  isVisible: boolean;
  onClose: () => void;
  initValue?: string;
  onValueChanged: (value: RadioData) => void;
  style?: SelectSourceOfFundModalStyles;
};

export type SelectSourceOfFundModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const SelectSourceOfFundModal = ({
  style,
  isVisible,
  onClose,
  onValueChanged,
  initValue,
}: SelectSourceOfFundModalProps) => {
  const styles: SelectSourceOfFundModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const _status = [
    { id: '1', label: 'Business' },
    { id: '2', label: 'Salary' },
    { id: '3', label: 'Savings/Investments' },
    { id: '4', label: 'Transactional Requirements' },
    { id: '5', label: 'Line of Credit' },
    { id: '6', label: 'Others' },
  ];
  const [value, setValue] = useState<RadioData | undefined>(_status[0]);

  useEffect(() => {
    if (initValue) {
      setValue(_status.find((c) => c.id === initValue || c.label === initValue));
    }
  }, [initValue]);

  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>{'Select account purpose'}</Text>
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

export default SelectSourceOfFundModal;
