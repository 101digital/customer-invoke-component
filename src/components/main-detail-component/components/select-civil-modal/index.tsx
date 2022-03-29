import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button, ThemeContext } from 'react-native-theme-component';
import RadioGroupComponent, { RadioData } from '../../../sub-components/radio-group';
import useMergeStyles from './styles';

export type SelectCivilModalProps = {
  isVisible: boolean;
  initValue?: string;
  onClose: () => void;
  onValueChanged: (value: RadioData) => void;
  style?: SelectCivilModalStyles;
};

export type SelectCivilModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const SelectCivilModal = ({
  style,
  isVisible,
  onClose,
  onValueChanged,
  initValue,
}: SelectCivilModalProps) => {
  const styles: SelectCivilModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const _civils = [
    { id: '1', label: 'Single' },
    { id: '2', label: 'Married' },
    { id: '3', label: 'Divorced' },
    { id: '4', label: 'Separated' },
    { id: '5', label: 'Widowed' },
  ];
  const [value, setValue] = useState<RadioData | undefined>(undefined);

  useEffect(() => {
    if (initValue) {
      setValue(_civils.find((c) => c.id === initValue || c.label === initValue));
    }
  }, [initValue]);

  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>Select civil status</Text>
        <RadioGroupComponent
          value={value}
          data={_civils}
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

export default SelectCivilModal;
