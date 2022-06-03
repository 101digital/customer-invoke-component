import { BackIcon } from '../../../../assets/icons';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { BottomSheet, Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';
import HeaderComponent from '../../../header-component';
import SearchField from '../../../sub-components/search-field';
import { filter, isEmpty, values } from 'lodash';
import { GroupCountry, CountryInformation } from '../../../../types';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import RadioGroupComponent from '../../../sub-components/radio-group';
import KeyboardSpace from '../../../sub-components/keyboard-space';

export type SelectCountryModalProps = {
  initValue?: string | number;
  isVisible: boolean;
  backIcon?: ReactNode;
  onClose: () => void;
  onSelected: (value: CountryInformation) => void;
  style?: SelectCountryModalStyles;
};

export type SelectCountryModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  countryListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  nationalityTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
};

const SelectCountryModal = ({
  style,
  isVisible,
  onClose,
  backIcon,
  onSelected,
  initValue,
}: SelectCountryModalProps) => {
  const styles: SelectCountryModalStyles = useMergeStyles(style);
  const { countries, colors } = useContext(ThemeContext);
  const [groupCountry, setGroupCountry] = useState<GroupCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryInformation | undefined>(undefined);

  useEffect(() => {
    if (isVisible) {
      setSelectedCountry(
        countries.find((c) => c.id === initValue || c.attributes.name === initValue)
      );
    } 
  }, [initValue, isVisible]);

  useEffect(() => {
    setGroupCountry(_handleSearch());
    return () => {
      setGroupCountry(_handleSearch());
    };
  }, [isVisible]);

  const _handleSearch = (key?: string) => {
    let _countries = isEmpty(key)
      ? countries
      : filter(countries, (n) => n.attributes.name.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupCountry[] = values(
      _countries
        .map((n) => ({
          ...n,
          section: n.attributes.name === 'Philippines' ? 'Featured' : n.attributes.name,
        }))
        .sort((a: CountryInformation, b: CountryInformation) => {
          return a.attributes.name.localeCompare(b.attributes.name, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, c: CountryInformation) => {
          let section =
            c.attributes.name === 'Philippines' ? 'Featured' : c.attributes.name[0].toUpperCase();
          if (!r[section]) {
            r[section] = { section, items: [c] };
          } else {
            r[section].items.push(c);
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
            id: 'selection-country',
            title: 'Country',
            subTitle: 'Select your country.',
            progress: 0,
          }}
        />
        <SearchField
          onSearch={(key: string) => {
            setGroupCountry(_handleSearch(key));
          }}
          placeholder={'Search country'}
        />
        {isEmpty(groupCountry) ? (
          <Text style={styles.emptyResultTextStyle}>{'No results found.'}</Text>
        ) : (
          <KeyboardAwareFlatList
            keyExtractor={(item) => item.section}
            data={groupCountry}
            keyboardShouldPersistTaps="handled"
            style={styles.countryListStyle}
            showsVerticalScrollIndicator={false}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            renderItem={({ item }) => {
              const radioValue =
                selectedCountry !== undefined
                  ? { id: selectedCountry.id, label: selectedCountry.attributes.name }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: CountryInformation) => ({
                      id: n.id,
                      label: n.attributes.name,
                    }))}
                    onChangeValue={(value) => {
                      setSelectedCountry(countries.find((c) => c.id === value.id));
                    }}
                    style={{
                      containerStyle: {
                        marginVertical: 0,
                      },
                      titleTextStyle: styles.nationalityTextStyle,
                    }}
                  />
                </View>
              );
            }}
          />
        )}

        <KeyboardSpace style={styles.footerContainerStyle}>
          <Button
            disabled={selectedCountry === undefined}
            onPress={() => {
              if (selectedCountry) {
                onSelected(selectedCountry);
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

export default SelectCountryModal;
