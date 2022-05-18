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
import { GroupProvinceList, ProvinceListData } from '../../../../types';
import { filter, isEmpty, values } from 'lodash';
import RadioGroupComponent from '../../../sub-components/radio-group';
import SearchField from '../../../sub-components/search-field';
const nationalityData = require('../../../../assets/data/nationality.json');
import { CustomerInvokeContext } from "../../../../context/onboarding-context";


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
  nationalityListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  nationalityTextStyle?: StyleProp<TextStyle>;
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

  const [groupNationalities, setGroupNationalities] = useState<GroupProvinceList[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | undefined>();
  const [searchText, setSearchText] = useState<string>('');
  const { colors } = useContext(ThemeContext);
  const {
    provinceList,
    getProvinceList,
    provincePaging
  } = useContext(CustomerInvokeContext);
  // const nationalities: Province[] = provinceList;
  // const groupedTransactions = groupTransactions(wallet.walletId);

  useEffect(() => {
    if (!provinceList) {
      getProvinceList(179,1)
    }
  }, [isVisible]);

  useEffect(() => {
    if (provinceList) {
      setSelectedProvince(provinceList.find((n) => n.id === initValue || n.locationName === initValue));
    }
  }, [initValue, isVisible]);

  useEffect(() => {
    if (provinceList) {
      setGroupNationalities(_handleSearch());
      return () => {
        setGroupNationalities(_handleSearch());
      };
    }

  }, [isVisible,provinceList]);

  const _handleSearch = (key?: string) => {
    let _nationalities = isEmpty(key)
      ? provinceList
      : filter(provinceList, (n) => n.locationName.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupProvinceList[] = values(
      _nationalities
        .map((n) => ({ ...n, section: n.isFeatured ? 'Featured' : n.locationName }))
        .sort((a: Province, b: Province) => {
          return a.locationName.localeCompare(b.locationName, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, n: Province) => {
          let section = n.isFeatured ? 'Featured' : n.locationName[0].toUpperCase();
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
            title: 'Province',
            subTitle: 'Select your Province.',
            progress: 0,
          }}
        />
        <SearchField
          onSearch={(key: string) => {
            getProvinceList(179,1,key)
            setSearchText(key)
            // setGroupNationalities(_handleSearch(key));
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
                selectedProvince !== undefined
                  ? { id: selectedProvince.id, label: selectedProvince.locationName }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: Province) => ({
                      id: n.id,
                      label: n.locationName,
                    }))}
                    onChangeValue={(value) => {
                      setSelectedProvince(provinceList.find((n) => n.id === value.id));
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
            onEndReached={()=>{

              let number = 1
              if (provincePaging  && provincePaging.pageNumber) {
                number = provincePaging.pageNumber+1
              }

              getProvinceList(179,number,searchText)
            }}
            onEndReachedThreshold={0.5}
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
