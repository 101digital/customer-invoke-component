import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  TextStyle,
  SafeAreaView,
} from 'react-native';
import { BottomSheet, Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';
import { BackIcon } from '../../../../assets/icons';
import HeaderComponent from '../../../header-component';
import KeyboardSpace from '../../../sub-components/keyboard-space';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { GroupBarangay, Barangay } from '../../../../types';
import { filter, isEmpty, values } from 'lodash';
import RadioGroupComponent from '../../../sub-components/radio-group';
import SearchField from '../../../sub-components/search-field';
const barangayData = require('../../../../assets/data/barangay.json');

export type SelectBarangayModalProps = {
  initValue?: string | number;
  isVisible: boolean;
  backIcon?: ReactNode;
  onClose: () => void;
  onSelected: (value: Barangay) => void;
  style?: SelectBarangayModalStyles;
};

export type SelectBarangayModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  barangayListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  barangayTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
};

const SelectBarangayModal = ({
  initValue,
  style,
  isVisible,
  onClose,
  backIcon,
  onSelected,
}: SelectBarangayModalProps) => {
  const styles: SelectBarangayModalStyles = useMergeStyles(style);
  const barangays: Barangay[] = JSON.parse(JSON.stringify(barangayData));
  const [groupBarangays, setGroupBarangays] = useState<GroupBarangay[]>([]);
  const [selectedBarangay, setSelectedBarangay] = useState<Barangay | undefined>(undefined);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    if (initValue) {
      setSelectedBarangay(barangays.find((b) => b.id === initValue || b.name === initValue));
    }
  }, [initValue, isVisible]);

  useEffect(() => {
    setGroupBarangays(_handleSearch());
    return () => {
      setGroupBarangays(_handleSearch());
    };
  }, [isVisible]);

  const _handleSearch = (key?: string) => {
    let _barangays = isEmpty(key)
      ? barangays
      : filter(barangays, (n) => n.name.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupBarangay[] = values(
      _barangays
        .map((n) => ({ ...n, section: n.isFeatured ? 'Featured' : n.name }))
        .sort((a: Barangay, b: Barangay) => {
          return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, n: Barangay) => {
          let section = n.isFeatured ? 'Featured' : n.name[0].toUpperCase();
          if (!r[section]) {
            r[section] = { section, items: [n] };
          } else {
            r[section].items.push(n);
          }
          return r;
        }, {})
    );
    const _featuredIndex = _groups.findIndex((g) => g.section === 'Featured');
    if (_featuredIndex !== -1) {
      return [
        _groups[_featuredIndex],
        ..._groups.slice(0, _featuredIndex),
        ..._groups.slice(_featuredIndex + 1),
      ];
    }
    return _groups;
  };

  return (
    <BottomSheet
      useSafeArea={false}
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{
        containerStyle: styles.containerStyle,
        contentContainerStyle: {
          flex: 1,
          justifyContent: 'flex-start',
        },
      }}
    >
      <SafeAreaView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={styles.backButtonContainerStyle}
        >
          {backIcon ?? <BackIcon width={17} height={12} />}
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.contentContainerStyle}>
        <HeaderComponent
          data={{
            id: 'selection-barangay',
            title: 'Barangay',
            subTitle: 'Select your barangay.',
            progress: 0,
          }}
        />
        <SearchField
          onSearch={(key: string) => {
            setGroupBarangays(_handleSearch(key));
          }}
          placeholder={'Search barangay'}
        />
        {isEmpty(groupBarangays) ? (
          <Text style={styles.emptyResultTextStyle}>{'No results found.'}</Text>
        ) : (
          <KeyboardAwareFlatList
            keyExtractor={(item) => item.section}
            data={groupBarangays}
            keyboardShouldPersistTaps="handled"
            style={styles.barangayListStyle}
            showsVerticalScrollIndicator={false}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            renderItem={({ item }) => {
              const radioValue =
                selectedBarangay !== undefined
                  ? { id: selectedBarangay.id, label: selectedBarangay.name }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: Barangay) => ({ id: n.id, label: n.name }))}
                    onChangeValue={(value) => {
                      setSelectedBarangay(barangays.find((n) => n.id === value.id));
                    }}
                    style={{
                      containerStyle: {
                        marginVertical: 0,
                      },
                      titleTextStyle: styles.barangayTextStyle,
                    }}
                  />
                </View>
              );
            }}
          />
        )}
        <KeyboardSpace style={styles.footerContainerStyle}>
          <Button
            disabled={selectedBarangay === undefined}
            onPress={() => {
              if (selectedBarangay) {
                onSelected(selectedBarangay);
              }
            }}
            label="Select"
            disableColor={colors.secondaryButtonColor}
          />
        </KeyboardSpace>
      </View>
    </BottomSheet>
  );
};

export default SelectBarangayModal;
