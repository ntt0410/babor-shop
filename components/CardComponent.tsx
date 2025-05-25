import { globalStyles } from '@/styles/globalStyles';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function CardComponent({ children, style }: Props) {
  return <View style={[globalStyles.card, style]}>{children}</View>;
}
