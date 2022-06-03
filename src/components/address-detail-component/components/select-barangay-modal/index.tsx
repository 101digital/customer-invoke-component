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
import { GroupLocationList, LocationListData } from '../../../../types';
import { filter, isEmpty, values } from 'lodash';
import RadioGroupComponent from '../../../sub-components/radio-group';
import SearchField from '../../../sub-components/search-field';
const nationalityData = require('../../../../assets/data/nationality.json');
import { CustomerInvokeContext } from "../../../../context/onboarding-context";


export type SelectBarangayModalProps = {
  initValue?: string | number;
  parentLocationId?: string | number;
  isVisible: boolean;
  backIcon?: ReactNode;
  onClose: () => void;
  onSelected: (value: LocationListData) => void;
  style?: SelectBarangayModalStyles;
};

export type SelectBarangayModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  nationalityListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  nationalityTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
};

const SelectBarangayModal = ({
  initValue,
  parentLocationId,
  style,
  isVisible,
  onClose,
  backIcon,
  onSelected,
}: SelectBarangayModalProps) => {
  const styles: SelectBarangayModalStyles = useMergeStyles(style);

  const [groupNationalities, setGroupNationalities] = useState<GroupLocationList[]>([]);
  const [selectedBarangay, setSelectedBarangay] = useState<LocationListData | undefined>();
  const [searchText, setSearchText] = useState<string>('');
  const { colors } = useContext(ThemeContext);
  const {
    barangayList,
    getBarangayList,
    barangayPaging
  } = useContext(CustomerInvokeContext);
  // const nationalities: Barangay[] = barangayList;
  // const groupedTransactions = groupTransactions(wallet.walletId);

  useEffect(() => {
    if (isVisible && parentLocationId) {
      getBarangayList(179,1,null,parentLocationId)

    }
  }, [isVisible]);

  useEffect(() => {
    if (barangayList) {
      setSelectedBarangay(barangayList.find((n) => n.id === initValue || n.locationName === initValue));
    }
  }, [initValue, isVisible]);

  useEffect(() => {
    if (barangayList) {
      setGroupNationalities(_handleSearch());
      return () => {
        setGroupNationalities(_handleSearch());
      };
    }

  }, [isVisible,barangayList]);

  const _handleSearch = (key?: string) => {
    let _nationalities = isEmpty(key)
      ? barangayList
      : filter(barangayList, (n) => n.locationName.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupLocationList[] = values(
      _nationalities
        .map((n) => ({ ...n, section: n.isFeatured ? 'Featured' : n.locationName }))
        .sort((a: Barangay, b: Barangay) => {
          return a.locationName.localeCompare(b.locationName, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, n: Barangay) => {
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
            id: 'selection-barangay',
            title: 'Barangay',
            subTitle: 'Select your barangay.',
            progress: 0,
          }}
        />
        <SearchField
          onSearch={(key: string) => {
            if (parentLocationId) {
              getBarangayList(179,1,key,parentLocationId)
            }else{
              getBarangayList(179,1,key)
            }

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
                selectedBarangay !== undefined
                  ? { id: selectedBarangay.id, label: selectedBarangay.locationName }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: LocationListData) => ({
                      id: n.id,
                      label: n.locationName,
                    }))}
                    onChangeValue={(value) => {
                      setSelectedBarangay(barangayList.find((n) => n.id === value.id));
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
              if (barangayPaging  && barangayPaging.pageNumber) {
                number = barangayPaging.pageNumber+1
              }
              if (parentLocationId) {
                getBarangayList(179,number,searchText,parentLocationId)
              }else{
                getBarangayList(179,number,searchText)
              }

            }}
            onEndReachedThreshold={0.5}
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
