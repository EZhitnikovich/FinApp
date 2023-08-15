import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function TestScreen() {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <Text>TestScreen</Text>
    </SafeAreaView>
  );
}
