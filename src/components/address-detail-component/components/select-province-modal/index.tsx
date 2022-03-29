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
import { GroupProvince, Province } from '../../../../types';
import { filter, isEmpty, values } from 'lodash';
import RadioGroupComponent from '../../../sub-components/radio-group';
import SearchField from '../../../sub-components/search-field';
const provinceData = require('../../../../assets/data/province.json');

export type SelectProvinceModalProps = {
  initValue?: string | number;
  isVisible: boolean;
  backIcon?: ReactNode;
  onClose: () => void;
  onSelected: (value: Province) => void;
  style?: SelectProvinceModalStyles;
};

export type SelectProvinceModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  provinceListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  provinceTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
};

const SelectProvinceModal = ({
  initValue,
  style,
  isVisible,
  onClose,
  backIcon,
  onSelected,
}: SelectProvinceModalProps) => {
  const styles: SelectProvinceModalStyles = useMergeStyles(style);
  const provinces: Province[] = JSON.parse(JSON.stringify(provinceData));
  const [groupProvinces, setGroupProvinces] = useState<GroupProvince[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | undefined>(undefined);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    setSelectedProvince(provinces.find((p) => p.id === initValue || p.name === initValue));
  }, [initValue, isVisible]);

  useEffect(() => {
    setGroupProvinces(_handleSearch());
    return () => {
      setGroupProvinces(_handleSearch());
    };
  }, [isVisible]);

  const _handleSearch = (key?: string) => {
    let _provinces = isEmpty(key)
      ? provinces
      : filter(provinces, (n) => n.name.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupProvince[] = values(
      _provinces
        .map((n) => ({ ...n, section: n.isFeatured ? 'Featured' : n.name }))
        .sort((a: Province, b: Province) => {
          return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, n: Province) => {
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
            id: 'selection-province',
            title: 'Province',
            subTitle: 'Select your province.',
            progress: 0,
          }}
        />
        <SearchField
          onSearch={(key: string) => {
            setGroupProvinces(_handleSearch(key));
          }}
          placeholder={'Search province'}
        />
        {isEmpty(groupProvinces) ? (
          <Text style={styles.emptyResultTextStyle}>{'No results found.'}</Text>
        ) : (
          <KeyboardAwareFlatList
            keyExtractor={(item) => item.section}
            data={groupProvinces}
            keyboardShouldPersistTaps="handled"
            style={styles.provinceListStyle}
            showsVerticalScrollIndicator={false}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            renderItem={({ item }) => {
              const radioValue =
                selectedProvince !== undefined
                  ? { id: selectedProvince.id, label: selectedProvince.name }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: Province) => ({ id: n.id, label: n.name }))}
                    onChangeValue={(value) => {
                      setSelectedProvince(provinces.find((n) => n.id === value.id));
                    }}
                    style={{
                      containerStyle: {
                        marginVertical: 0,
                      },
                      titleTextStyle: styles.provinceTextStyle,
                    }}
                  />
                </View>
              );
            }}
          />
        )}
        <KeyboardSpace style={styles.footerContainerStyle}>
          <Button
            disabled={selectedProvince === undefined}
            onPress={() => {
              if (selectedProvince) {
                onSelected(selectedProvince);
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

export default SelectProvinceModal;
