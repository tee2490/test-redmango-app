import { ActivityIndicator, View } from "react-native";
import React from "react";

type Props = {
  color?: string;
};

export default function MiniLoader({ color = "#0000ff" }: Props) {
  return (
    <View>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}
