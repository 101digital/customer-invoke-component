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
import { BackIcon } from '../../../assets/icons';
import HeaderComponent, { HeaderComponentProps } from '../../header-component';
import KeyboardSpace from '../keyboard-space';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { GroupCity, City } from '../../../types';
import { filter, isEmpty, values } from 'lodash';
import RadioGroupComponent from '../radio-group';
import SearchField from '../search-field';
const cityData = require('../../../assets/data/city.json');

export type SelectCityModalProps = {
  initValue?: string | number;
  isVisible: boolean;
  header: HeaderComponentProps;
  backIcon?: ReactNode;
  onClose: () => void;
  onSelected: (value: City) => void;
  style?: SelectCityModalStyles;
};

export type SelectCityModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  cityListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  cityTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
};

const SelectCityModal = ({
  initValue,
  style,
  isVisible,
  onClose,
  backIcon,
  onSelected,
  header,
}: SelectCityModalProps) => {
  const styles: SelectCityModalStyles = useMergeStyles(style);
  const cities: City[] = JSON.parse(JSON.stringify(cityData));
  const [groupCitys, setGroupCitys] = useState<GroupCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    setSelectedCity(cities.find((c) => c.id === initValue || c.name === initValue));
  }, [initValue, isVisible]);

  useEffect(() => {
    setGroupCitys(_handleSearch());
    return () => {
      setGroupCitys(_handleSearch());
    };
  }, [isVisible]);

  const _handleSearch = (key?: string) => {
    let _cities = isEmpty(key)
      ? cities
      : filter(cities, (n) => n.name.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupCity[] = values(
      _cities
        .map((n) => ({ ...n, section: n.isFeatured ? 'Featured' : n.name }))
        .sort((a: City, b: City) => {
          return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, n: City) => {
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
        <HeaderComponent {...header} />
        <SearchField
          onSearch={(key: string) => {
            setGroupCitys(_handleSearch(key));
          }}
          placeholder={'Search city'}
        />
        {isEmpty(groupCitys) ? (
          <Text style={styles.emptyResultTextStyle}>{'No results found.'}</Text>
        ) : (
          <KeyboardAwareFlatList
            keyExtractor={(item) => item.section}
            data={groupCitys}
            keyboardShouldPersistTaps="handled"
            style={styles.cityListStyle}
            showsVerticalScrollIndicator={false}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            renderItem={({ item }) => {
              const radioValue =
                selectedCity !== undefined
                  ? { id: selectedCity.id, label: selectedCity.name }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: City) => ({ id: n.id, label: n.name }))}
                    onChangeValue={(value) => {
                      setSelectedCity(cities.find((n) => n.id === value.id));
                    }}
                    style={{
                      containerStyle: {
                        marginVertical: 0,
                      },
                      titleTextStyle: styles.cityTextStyle,
                    }}
                  />
                </View>
              );
            }}
          />
        )}
        <KeyboardSpace style={styles.footerContainerStyle}>
          <Button
            disabled={selectedCity === undefined}
            onPress={() => {
              if (selectedCity) {
                onSelected(selectedCity);
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

export default SelectCityModal;
