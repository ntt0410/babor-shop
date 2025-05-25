import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";

interface ColComponentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  gap?: number;
  center?: boolean;
}

const ColComponent: React.FC<ColComponentProps> = ({
  children,
  style,
  gap = 0,
  center = false,
}) => {
  const baseStyle: ViewStyle = {
    flexDirection: "column",
    justifyContent: center ? "center" : undefined,
    alignItems: center ? "center" : undefined,
    gap,
  };

  return <View style={[baseStyle, style]}>{children}</View>;
};

export default ColComponent;
