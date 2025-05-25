import React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface AvatarComponentProps {
  source?: string;
  size?: number;
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  fallbackText?: string;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({
  source,
  size = 60,
  imageStyle,
  containerStyle,
  fallbackText = "?",
}) => {
  const radius = size / 2;

  const DEFAULT_AVATAR =
    "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740";

  const avatarSource =
    source && source.trim() !== "" ? source : DEFAULT_AVATAR;

  return source ? (
    <Image
      source={{ uri: avatarSource }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius,
        },
        styles.avatar,
        imageStyle,
      ]}
    />
  ) : (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius,
        },
        styles.fallback,
        containerStyle,
      ]}
    >
      <Text style={styles.fallbackText}>{fallbackText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    resizeMode: "cover",
  },
  fallback: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  fallbackText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AvatarComponent;
