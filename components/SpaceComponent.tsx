import React from "react";
import { View, ViewStyle } from "react-native";

interface SpaceComponentProps {
  height?: number;
  width?: number;
}

const SpaceComponent: React.FC<SpaceComponentProps> = ({
  height = 0,
  width = 0,
}) => {
  const style: ViewStyle = {
    height,
    width,
  };

  return <View style={style} />;
};

export default SpaceComponent;
