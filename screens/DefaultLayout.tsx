import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

type DefaultLayoutProps = {
  children: React.JSX.Element;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <View className="h-full">
      <StatusBar style="dark" />
      {children}
    </View>
  );
}
