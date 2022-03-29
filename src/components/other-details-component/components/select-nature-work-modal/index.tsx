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
import { GroupNatureWork, NatureWork } from '../../../../types';
import { filter, isEmpty, values } from 'lodash';
import RadioGroupComponent from '../../../sub-components/radio-group';
import SearchField from '../../../sub-components/search-field';
const natureWorkData = require('../../../../assets/data/natureWork.json');

export type SelectNatureWorkModalProps = {
  initValue?: string | number;
  isVisible: boolean;
  backIcon?: ReactNode;
  onClose: () => void;
  onSelected: (value: NatureWork) => void;
  style?: SelectNatureWorkModalStyles;
};

export type SelectNatureWorkModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  natureWorkListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  natureWorkTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
};

const SelectNatureWorkModal = ({
  initValue,
  style,
  isVisible,
  onClose,
  backIcon,
  onSelected,
}: SelectNatureWorkModalProps) => {
  const styles: SelectNatureWorkModalStyles = useMergeStyles(style);
  const natureWorks: NatureWork[] = JSON.parse(JSON.stringify(natureWorkData));
  const [groupNatureWorks, setGroupNatureWorks] = useState<GroupNatureWork[]>([]);
  const [selectedNatureWork, setSelectedNatureWork] = useState<NatureWork | undefined>(undefined);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    setSelectedNatureWork(natureWorks.find((n) => n.id === initValue || n.name === initValue));
  }, [initValue, isVisible]);

  useEffect(() => {
    setGroupNatureWorks(_handleSearch());
    return () => {
      setGroupNatureWorks(_handleSearch());
    };
  }, [isVisible]);

  const _handleSearch = (key?: string) => {
    let _natureWorks = isEmpty(key)
      ? natureWorks
      : filter(natureWorks, (n) => n.name.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupNatureWork[] = values(
      _natureWorks
        .map((n) => ({
          ...n,
          section: !isNaN(parseInt(n.name[0], 10)) ? 'Numbers' : n.name,
        }))
        .sort((a: NatureWork, b: NatureWork) => {
          return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, n: NatureWork) => {
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
            id: 'selection-natureWork',
            title: 'Nature of work / business',
            subTitle: 'Select nature of work /  business.',
            progress: 0,
          }}
        />
        <SearchField
          onSearch={(key: string) => {
            setGroupNatureWorks(_handleSearch(key));
          }}
          placeholder={'Search nature of work / business'}
        />
        {isEmpty(groupNatureWorks) ? (
          <Text style={styles.emptyResultTextStyle}>{'No results found.'}</Text>
        ) : (
          <KeyboardAwareFlatList
            keyExtractor={(item) => item.section}
            data={groupNatureWorks}
            keyboardShouldPersistTaps="handled"
            style={styles.natureWorkListStyle}
            showsVerticalScrollIndicator={false}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            renderItem={({ item }) => {
              const radioValue =
                selectedNatureWork !== undefined
                  ? { id: selectedNatureWork.id, label: selectedNatureWork.name }
                  : undefined;
              return (
                <View>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  <RadioGroupComponent
                    value={radioValue}
                    variant="inner"
                    data={item.items.map((n: NatureWork) => ({ id: n.id, label: n.name }))}
                    onChangeValue={(value) => {
                      setSelectedNatureWork(natureWorks.find((n) => n.id === value.id));
                    }}
                    style={{
                      containerStyle: {
                        marginVertical: 0,
                      },
                      titleTextStyle: styles.natureWorkTextStyle,
                    }}
                  />
                </View>
              );
            }}
          />
        )}
        <KeyboardSpace style={styles.footerContainerStyle}>
          <Button
            disabled={selectedNatureWork === undefined}
            onPress={() => {
              if (selectedNatureWork) {
                onSelected(selectedNatureWork);
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

export default SelectNatureWorkModal;
