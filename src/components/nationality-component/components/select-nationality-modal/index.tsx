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
import { GroupNationality, Nationality } from '../../../../types';
import { filter, isEmpty, values } from 'lodash';
import RadioGroupComponent from '../../../sub-components/radio-group';
import SearchField from '../../../sub-components/search-field';
const nationalityData = require('../../../../assets/data/nationality.json');

export type SelectNationalityModalProps = {
  initValue?: string | number;
  isVisible: boolean;
  backIcon?: ReactNode;
  onClose: () => void;
  onSelected: (value: Nationality) => void;
  style?: SelectNationalityModalStyles;
};

export type SelectNationalityModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  nationalityListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  nationalityTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
};

const SelectNationalityModal = ({
  initValue,
  style,
  isVisible,
  onClose,
  backIcon,
  onSelected,
}: SelectNationalityModalProps) => {
  const styles: SelectNationalityModalStyles = useMergeStyles(style);
  const nationalities: Nationality[] = JSON.parse(JSON.stringify(nationalityData));
  const [groupNationalities, setGroupNationalities] = useState<GroupNationality[]>([]);
  const [selectedNationality, setSelectedNationality] = useState<Nationality | undefined>();
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    setSelectedNationality(nationalities.find((n) => n.id === initValue || n.name === initValue));
  }, [initValue, isVisible]);

  useEffect(() => {
    setGroupNationalities(_handleSearch());
    return () => {
      setGroupNationalities(_handleSearch());
    };
  }, [isVisible]);

  const _handleSearch = (key?: string) => {
    let _nationalities = isEmpty(key)
      ? nationalities
      : filter(nationalities, (n) => n.name.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupNationality[] = values(
      _nationalities
        .map((n) => ({ ...n, section: n.isFeatured ? 'Featured' : n.name }))
        .sort((a: Nationality, b: Nationality) => {
          return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, n: Nationality) => {
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
            id: 'selection-nationality',
            title: 'Nationality',
            subTitle: 'Select your nationality.',
            progress: 0,
          }}
        />
        <SearchField
          onSearch={(key: string) => {
            setGroupNationalities(_handleSearch(key));
          }}
          placeholder={'Search nationality'}
        />
        {isEmpty(groupNationalities) ? (
          <Text style={styles.emptyResultTextStyle}>{'No results found.'}</Text>
        ) : (
          <KeyboardAwareFlatList
            keyExtractor={(item) => item.section}
            data={groupNationalities}
            keyboardShouldPersistTaps="handled"
            style={styles.nationalityListStyle}
            showsVerticalScrollIndicator={false}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            renderItem={({ item }) => {
              const radioValue =
                selectedNationality !== undefined
                  ? { id: selectedNationality.id, label: selectedNationality.name }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: Nationality) => ({
                      id: n.id,
                      label: n.name,
                    }))}
                    onChangeValue={(value) => {
                      setSelectedNationality(nationalities.find((n) => n.id === value.id));
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
            disabled={selectedNationality === undefined}
            onPress={() => {
              if (selectedNationality) {
                onSelected(selectedNationality);
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

export default SelectNationalityModal;
