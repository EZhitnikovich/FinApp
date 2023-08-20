import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { Account, Category } from "../types/index";
import OperationScreen from "../screens/OperationScreen";

export type RootStackParams = {
  Home: undefined;
  Income: {
    account: Account;
    categories: Category[];
  };
  // MoreInfo: undefined;
  // AddCard: {
  //   accounts: Account[];
  // };
  // Test: undefined;
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
        <Stack.Screen name="Income" component={OperationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
