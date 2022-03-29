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
import { GroupRegion, Region } from '../../../../types';
import { filter, isEmpty, values } from 'lodash';
import RadioGroupComponent from '../../../sub-components/radio-group';
import SearchField from '../../../sub-components/search-field';
const regionData = require('../../../../assets/data/region.json');

export type SelectRegionModalProps = {
  initValue?: string | number;
  isVisible: boolean;
  backIcon?: ReactNode;
  onClose: () => void;
  onSelected: (value: Region) => void;
  style?: SelectRegionModalStyles;
};

export type SelectRegionModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  regionListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  regionTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
};

const SelectRegionModal = ({
  initValue,
  style,
  isVisible,
  onClose,
  backIcon,
  onSelected,
}: SelectRegionModalProps) => {
  const styles: SelectRegionModalStyles = useMergeStyles(style);
  const regions: Region[] = JSON.parse(JSON.stringify(regionData));
  const [groupRegions, setGroupRegions] = useState<GroupRegion[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | undefined>(undefined);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    setSelectedRegion(regions.find((r) => r.id === initValue || r.name === initValue));
  }, [initValue, isVisible]);

  useEffect(() => {
    setGroupRegions(_handleSearch());
    return () => {
      setGroupRegions(_handleSearch());
    };
  }, [isVisible]);

  const _handleSearch = (key?: string) => {
    let _regions = isEmpty(key)
      ? regions
      : filter(regions, (n) => n.name.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupRegion[] = values(
      _regions
        .map((n) => ({ ...n, section: n.isFeatured ? 'Featured' : n.name }))
        .sort((a: Region, b: Region) => {
          return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, n: Region) => {
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
            id: 'selection-region',
            title: 'Region',
            subTitle: 'Select your region.',
            progress: 0,
          }}
        />
        <SearchField
          onSearch={(key: string) => {
            setGroupRegions(_handleSearch(key));
          }}
          placeholder={'Search region'}
        />
        {isEmpty(groupRegions) ? (
          <Text style={styles.emptyResultTextStyle}>{'No results found.'}</Text>
        ) : (
          <KeyboardAwareFlatList
            keyExtractor={(item) => item.section}
            data={groupRegions}
            keyboardShouldPersistTaps="handled"
            style={styles.regionListStyle}
            showsVerticalScrollIndicator={false}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            renderItem={({ item }) => {
              const radioValue =
                selectedRegion !== undefined
                  ? { id: selectedRegion.id, label: selectedRegion.name }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: Region) => ({ id: n.id, label: n.name }))}
                    onChangeValue={(value) => {
                      setSelectedRegion(regions.find((n) => n.id === value.id));
                    }}
                    style={{
                      containerStyle: {
                        marginVertical: 0,
                      },
                      titleTextStyle: styles.regionTextStyle,
                    }}
                  />
                </View>
              );
            }}
          />
        )}
        <KeyboardSpace style={styles.footerContainerStyle}>
          <Button
            disabled={selectedRegion === undefined}
            onPress={() => {
              if (selectedRegion) {
                onSelected(selectedRegion);
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

export default SelectRegionModal;
