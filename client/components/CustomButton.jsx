import React from 'react';
import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

const CustomButton = ({
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
  reservationHandle
}) => {
  const [isExtended, setIsExtended] = React.useState(false);

  return (
    <AnimatedFAB
      icon={'calendar-plus'}
      extended={isExtended}
      onPress={reservationHandle}
      visible={visible}
      animateFrom={'right'}
      iconMode={'static'}
      style={[styles.fabStyle, style]}
      color={"black"}
    />

  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});