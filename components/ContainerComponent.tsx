// ContainerComponent.tsx
import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";

interface ContainerComponentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: boolean;
  margin?: boolean;
  flex?: number; 
}

const ContainerComponent: React.FC<ContainerComponentProps> = ({
  children,
  style,
  padding = true,
  margin = true,
  flex = 1,
}) => {
  return (
    <View
      style={[
        styles.container,
        flex ? { flex } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ContainerComponent;
