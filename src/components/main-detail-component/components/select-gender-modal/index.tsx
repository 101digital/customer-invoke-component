import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button, ThemeContext } from 'react-native-theme-component';
import RadioGroupComponent, { RadioData } from '../../../sub-components/radio-group';
import useMergeStyles from './styles';

export type SelectGenderModalProps = {
  isVisible: boolean;
  onClose: () => void;
  initValue?: string;
  onValueChanged: (value: RadioData) => void;
  style?: SelectGenderModalStyles;
};

export type SelectGenderModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const SelectGenderModal = ({
  style,
  isVisible,
  onClose,
  onValueChanged,
  initValue,
}: SelectGenderModalProps) => {
  const styles: SelectGenderModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const _genders: { id: string | number; label: string }[] = [
    { id: '1', label: 'Male' },
    { id: '2', label: 'Female' },
  ];

  const [value, setValue] = useState<RadioData | undefined>(undefined);

  useEffect(() => {
    if (initValue) {
      setValue(_genders.find((g) => g.id === initValue || g.label === initValue));
    }
  }, [initValue]);

  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>Select gender</Text>
        <RadioGroupComponent
          data={_genders}
          onChangeValue={(v) => {
            setValue(v);
          }}
          value={value}
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

export default SelectGenderModal;
