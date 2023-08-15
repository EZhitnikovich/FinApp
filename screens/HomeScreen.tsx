import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
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
import { Account } from "../types/index";
import DefaultLayout from "./DefaultLayout";

const moqAccounts: Account[] = [
  {
    balance: 105224,
    name: "Account name1",
    categories: [
      { id: 0, color: "#536f96", name: "set" },
      { id: 1, color: "#00ff00", name: "dfghdshfugisdhf" },
    ],
    history: [
      { amount: 50, date: "16-7-2023", id: 0, categoryId: -1 },
      {
        amount: 65,
        date: "16-7-2023",
        id: 1,
        categoryId: 0,
      },
      {
        amount: 100,
        date: "16-7-2023",
        id: 2,
        categoryId: 1,
      },
    ],
  },
  {
    balance: 999999,
    name: "Account name2",
    history: [],
    categories: [],
  },
];

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [accounts, setAccounts] = useState<Account[]>(moqAccounts);
  const [currentAccount, selectAccount] = useState<Account | null>(accounts[0]);

  return (
    <DefaultLayout>
      <View className="flex flex-col h-full pt-1">
        {/* accounts */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="border-b pb-2 flex-grow-0"
        >
          {/* account */}
          {accounts.length > 0
            ? accounts.map((account, index) => (
                <View
                  key={index}
                  className="w-60 rounded-3xl p-3 space-y-1 border mr-5"
                >
                  <Text className="text-black text-2xl border-b-2 font-semibold">
                    {account.name}
                  </Text>
                  {/* balance */}
                  <View className="flex-row justify-between">
                    <Text className="text-black text-base font-semibold">
                      Balance:
                    </Text>
                    <View className="flex-row">
                      <Text className="text-black text-base font-semibold pr-1">
                        {`${account.balance}`.length > 13
                          ? `${account.balance}`.slice(0, 11) + "..."
                          : account.balance}
                      </Text>
                      <CreditCardIcon color="black" />
                    </View>
                  </View>
                  {/* modification date */}
                  <View className="flex-row justify-between">
                    <Text className="text-black text-base font-semibold">
                      Last:
                    </Text>
                    <View className="flex-row">
                      <Text className="text-black text-base font-semibold pr-1">
                        {account.history.find(
                          (x) => x.id === account.history.length - 1
                        )?.date ?? "No data"}
                      </Text>
                      <CalendarIcon color="black" />
                    </View>
                  </View>
                  {/* View button */}
                  <TouchableOpacity
                    onPress={() => selectAccount(account)}
                    className="flex-row rounded-full border p-2 justify-center"
                  >
                    <MagnifyingGlassIcon size={25} color="black" />
                    <Text className="font-semibold text-base">View</Text>
                  </TouchableOpacity>
                </View>
              ))
            : null}
          {/* add account */}
          <View className="flex border w-60 rounded-3xl justify-center">
            <TouchableOpacity className="justify-center m-auto border-2 rounded-full">
              <PlusIcon size={75} color="black" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* body */}
        {currentAccount ? (
          <View className="mt-5 flex-grow">
            <Text className="text-center font-bold text-3xl">
              {currentAccount.name}
            </Text>
            <View className="flex-row px-4 justify-between py-2">
              <Text className="font-semibold text-2xl">Balance:</Text>
              <Text className="font-semibold text-2xl">
                {currentAccount.balance}
              </Text>
            </View>
            <View className="flex-row px-4 justify-between py-2">
              <Text className="font-semibold text-2xl">Last Update:</Text>
              <Text className="font-semibold text-2xl">
                {currentAccount.history.find(
                  (x) => x.id === currentAccount.history.length - 1
                )?.date ?? "No data"}
              </Text>
            </View>
            {/* chart */}
            {currentAccount && currentAccount.history.length > 0 ? (
              <View>
                <View className="m-auto py-5">
                  <PieChart
                    widthAndHeight={200}
                    series={currentAccount.history.map((item) => item.amount)}
                    sliceColor={currentAccount.history.map((item) =>
                      item.categoryId !== -1
                        ? currentAccount.categories[item.categoryId].color
                        : "#000000"
                    )}
                    coverRadius={0.6}
                  />
                </View>
                {/* legend */}
                {currentAccount.categories.length > 0 ? (
                  <FlatList
                    className="px-3 pb-4"
                    numColumns={3}
                    data={currentAccount.categories}
                    keyExtractor={(_, index) => `${index}`}
                    renderItem={({ item }) => (
                      <View style={{ flex: 1 / 3 }} className="flex-row py-1">
                        <BookmarkSquareIcon color={item.color} />
                        <Text>{item.name}</Text>
                      </View>
                    )}
                  />
                ) : null}
              </View>
            ) : null}
          </View>
        ) : null}
        {/* footer */}
        {currentAccount ? (
          <TouchableOpacity
            className="flex-row rounded-full border p-2 justify-center mx-20 my-5 flex-grow-0"
            onPress={() => navigation.navigate("MoreInfo")}
          >
            <MagnifyingGlassPlusIcon size={25} color="black" />
            <Text className="font-semibold text-base">More</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </DefaultLayout>
  );
}
