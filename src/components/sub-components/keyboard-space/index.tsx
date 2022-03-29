import React, { ReactNode, useEffect, useRef } from 'react';
import {
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardEvent,
  Platform,
  Animated,
  Easing,
} from 'react-native';

export type KeyboardSpaceProps = {
  children: ReactNode;
  extraBottom?: number;
  style?: StyleProp<ViewStyle>;
};

const KeyboardSpace = ({ children, style, extraBottom }: KeyboardSpaceProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const slideUp = (e: KeyboardEvent) => {
    Animated.timing(slideAnim, {
      toValue: e.endCoordinates.height + (extraBottom ?? 0),
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const onKeyboardDidShow = (e: KeyboardEvent) => {
    slideUp(e);
  };

  const onKeyboardDidHide = () => {
    slideDown();
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
    };
  }, []);

  const _left = 0;
  const _right = 0;
  const _position = 'absolute';
  const _bottom = Platform.OS === 'android' ? 0 : slideAnim;

  return (
    <Animated.View
      style={[{ position: _position, left: _left, right: _right }, style, { bottom: _bottom }]}
    >
      {children}
    </Animated.View>
  );
};

export default KeyboardSpace;
