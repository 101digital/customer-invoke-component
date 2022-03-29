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
import { GroupOccupation, Occupation } from '../../../../types';
import { filter, isEmpty, values } from 'lodash';
import RadioGroupComponent from '../../../sub-components/radio-group';
import SearchField from '../../../sub-components/search-field';
const occupationData = require('../../../../assets/data/occupation.json');

export type SelectOccupationModalProps = {
  initValue?: string | number;
  isVisible: boolean;
  backIcon?: ReactNode;
  onClose: () => void;
  onSelected: (value: Occupation) => void;
  style?: SelectOccupationModalStyles;
};

export type SelectOccupationModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  occupationListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  occupationTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
};

const SelectOccupationModal = ({
  initValue,
  style,
  isVisible,
  onClose,
  backIcon,
  onSelected,
}: SelectOccupationModalProps) => {
  const styles: SelectOccupationModalStyles = useMergeStyles(style);
  const occupations: Occupation[] = JSON.parse(JSON.stringify(occupationData));
  const [groupOccupations, setGroupOccupations] = useState<GroupOccupation[]>([]);
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation | undefined>(undefined);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    setSelectedOccupation(occupations.find((o) => o.id === initValue || o.name === initValue));
  }, [initValue, isVisible]);

  useEffect(() => {
    setGroupOccupations(_handleSearch());
    return () => {
      setGroupOccupations(_handleSearch());
    };
  }, [isVisible]);

  const _handleSearch = (key?: string) => {
    let _occupations = isEmpty(key)
      ? occupations
      : filter(occupations, (n) => n.name.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupOccupation[] = values(
      _occupations
        .map((n) => ({
          ...n,
          section: !isNaN(parseInt(n.name[0], 10)) ? 'Numbers' : n.name,
        }))
        .sort((a: Occupation, b: Occupation) => {
          return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, n: Occupation) => {
          let section = !isNaN(parseInt(n.name[0], 10)) ? 'Numbers' : n.name[0].toUpperCase();
          if (!r[section]) {
            r[section] = { section, items: [n] };
          } else {
            r[section].items.push(n);
          }
          return r;
        }, {})
    );
    const _featuredIndex = _groups.findIndex((g) => g.section === 'Numbers');
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
            id: 'selection-occupation',
            title: 'Occupation',
            subTitle: 'Select occupation.',
            progress: 0,
          }}
        />
        <SearchField
          onSearch={(key: string) => {
            setGroupOccupations(_handleSearch(key));
          }}
          placeholder={'Search occupation'}
        />
        {isEmpty(groupOccupations) ? (
          <Text style={styles.emptyResultTextStyle}>{'No results found.'}</Text>
        ) : (
          <KeyboardAwareFlatList
            keyExtractor={(item) => item.section}
            data={groupOccupations}
            keyboardShouldPersistTaps="handled"
            style={styles.occupationListStyle}
            showsVerticalScrollIndicator={false}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            renderItem={({ item }) => {
              const radioValue =
                selectedOccupation !== undefined
                  ? { id: selectedOccupation.id, label: selectedOccupation.name }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: Occupation) => ({ id: n.id, label: n.name }))}
                    onChangeValue={(value) => {
                      setSelectedOccupation(occupations.find((n) => n.id === value.id));
                    }}
                    style={{
                      containerStyle: {
                        marginVertical: 0,
                      },
                      titleTextStyle: styles.occupationTextStyle,
                    }}
                  />
                </View>
              );
            }}
          />
        )}
        <KeyboardSpace style={styles.footerContainerStyle}>
          <Button
            disabled={selectedOccupation === undefined}
            onPress={() => {
              if (selectedOccupation) {
                onSelected(selectedOccupation);
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

export default SelectOccupationModal;
