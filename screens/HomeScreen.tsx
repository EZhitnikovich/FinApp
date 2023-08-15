import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";

import {
  BookmarkSquareIcon,
  CalendarIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassPlusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";

import PieChart from "react-native-pie-chart";
import { Category } from "../types/index";
import DefaultLayout from "./DefaultLayout";

const moqData = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const moqCategories: Category[] = [
  {
    color: "#fbd203",
    name: "category1",
  },
  {
    color: "#ffb300",
    name: "cat2",
  },
  {
    color: "#ff9100",
    name: "category3",
  },
  {
    color: "#ff6c00",
    name: "cat4",
  },
  {
    color: "#ff6cff",
    name: "cat5",
  },
  {
    color: "#fbd203",
    name: "category1",
  },
  {
    color: "#ffb300",
    name: "cat2",
  },
  {
    color: "#ff9100",
    name: "category3",
  },
  {
    color: "#ff6c00",
    name: "cat4",
  },
  {
    color: "#ff6cff",
    name: "cat5",
  },
  {
    color: "#fbd203",
    name: "category1",
  },
  {
    color: "#ffb300",
    name: "cat2",
  },
  {
    color: "#ff9100",
    name: "category3",
  },
  {
    color: "#ff6c00",
    name: "cat4",
  },
  {
    color: "#ff6cff",
    name: "cat5",
  },
];

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <DefaultLayout>
      <SafeAreaView className="flex flex-col h-full pt-1">
        {/* accounts */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="border-b pb-2 flex-grow-0"
        >
          {/* account */}
          <View className="w-60 rounded-3xl p-3 space-y-1 border mr-5">
            <Text className="text-black text-2xl border-b-2 font-semibold">
              Name
            </Text>
            {/* balance */}
            <View className="flex-row justify-between">
              <Text className="text-black text-base font-semibold">
                Balance:
              </Text>
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
        {/* body */}
        <View className="mt-5 flex-grow">
          <Text className="text-center font-bold text-3xl">Name</Text>
          <View className="flex-row px-4 justify-between py-2">
            <Text className="font-semibold text-2xl">Balance:</Text>
            <Text className="font-semibold text-2xl">5823856728356867235</Text>
          </View>
          <View className="flex-row px-4 justify-between py-2">
            <Text className="font-semibold text-2xl">Last Update:</Text>
            <Text className="font-semibold text-2xl">
              {`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}
            </Text>
          </View>
          {/* chart */}
          <View className="m-auto py-5">
            <PieChart
              widthAndHeight={200}
              series={[12, 5, 7, 12, 5]}
              sliceColor={[
                "#fbd203",
                "#ffb300",
                "#ff9100",
                "#ff6c00",
                "#ff6cff",
              ]}
              coverRadius={0.6}
            />
          </View>
          {/* legend */}
          <FlatList
            className="px-3 pb-4"
            numColumns={3}
            data={moqCategories}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({ item }) => (
              <View style={{ flex: 1 / 3 }} className="flex-row py-1">
                <BookmarkSquareIcon color={item.color} />
                <Text>{item.name}</Text>
              </View>
            )}
          />
        </View>
        {/* footer */}
        <TouchableOpacity className="flex-row rounded-full border p-2 justify-center mx-20 my-5">
          <MagnifyingGlassPlusIcon size={25} color="black" />
          <Text className="font-semibold text-base">More</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </DefaultLayout>
  );
}
