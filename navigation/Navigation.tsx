import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { Account, Category, Transaction } from "../types/index";
import OperationScreen from "../screens/OperationScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HistoryScreen from "../screens/HistoryScreen";

export type RootStackParams = {
  Home: undefined;
  Operation: {
    account: Account;
    categories: Category[];
  };
  History: {
    history: Transaction[];
    categories: Category[];
  };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Operation" component={OperationScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
