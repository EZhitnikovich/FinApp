import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";

import {
  CalendarIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "react-native-heroicons/outline";

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {/* account */}
        <View className="flex justify-center w-60 rounded-3xl p-3 space-y-1 border mr-5">
          <Text className="text-black text-2xl border-b-2 font-semibold">
            Name
          </Text>
          {/* balance */}
          <View className="flex-row justify-between">
            <Text className="text-black text-base font-semibold">Balance:</Text>
            <View className="flex-row">
              <Text className="text-black text-base font-semibold pr-1">
                {/* TODO: replace */}
                {"5823856728356867235".length > 13
                  ? "5823856728356867235".slice(0, 11) + "..."
                  : "5823856728356867235"}
              </Text>
              <CreditCardIcon color="black" />
            </View>
          </View>
          {/* modification date */}
          <View className="flex-row justify-between">
            <Text className="text-black text-base font-semibold">Last:</Text>
            <View className="flex-row">
              <Text className="text-black text-base font-semibold pr-1">
                {/* TODO: replace */}
                {`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}
              </Text>
              <CalendarIcon color="black" />
            </View>
          </View>
          {/* View button */}
          <TouchableOpacity className="flex-row rounded-full border p-2 justify-center">
            <MagnifyingGlassIcon size={25} color="black" />
            <Text className="font-semibold text-base">View</Text>
          </TouchableOpacity>
        </View>
        {/* add account */}
        <View className="flex border w-60 rounded-3xl justify-center">
          <TouchableOpacity className="justify-center m-auto border-2 rounded-full">
            <PlusIcon size={75} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
