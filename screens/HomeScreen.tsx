import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";
import { v4 as uuidv4 } from "uuid";

import {
  BookmarkSquareIcon,
  CalendarIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassPlusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";

import PieChart from "react-native-pie-chart";
import { Account, Transaction } from "../types/index";
import DefaultLayout from "./DefaultLayout";

const moqAccounts: Account[] = [
  {
    balance: 105224,
    name: "Account name1",
    categories: [
      {
        id: "d54189b3-e85b-4798-81cb-6c5a5b353f4a",
        color: "#536f96",
        name: "set",
      },
      {
        id: "f89977c0-8334-4226-ab20-784840d42863",
        color: "#00ff00",
        name: "dfghdshfugisdhf",
      },
    ],
    history: [
      { amount: 50, date: "16-7-2023", id: uuidv4(), categoryId: "" },
      {
        amount: 65,
        date: "16-7-2023",
        id: uuidv4(),
        categoryId: "d54189b3-e85b-4798-81cb-6c5a5b353f4a",
      },
      {
        amount: 100,
        date: "16-7-2023",
        id: uuidv4(),
        categoryId: "f89977c0-8334-4226-ab20-784840d42863",
      },
      {
        amount: 7,
        date: "17-7-2023",
        id: uuidv4(),
        categoryId: "d54189b3-e85b-4798-81cb-6c5a5b353f4a",
      },
      {
        amount: 66,
        date: "17-7-2023",
        id: uuidv4(),
        categoryId: "d54189b3-e85b-4798-81cb-6c5a5b353f4a",
      },
      {
        amount: 20,
        date: "16-7-2023",
        id: uuidv4(),
        categoryId: "f89977c0-8334-4226-ab20-784840d42863",
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

  const getSumWithCategories = (history: Transaction[]) => {
    var result: {
      key: string;
      value: number;
    }[] = [];

    for (let i = 0; i < history.length; i++) {
      let val = result.find((x) => x.key === history[i].categoryId);
      if (val) {
        val.value += history[i].amount;
      } else {
        result.push({
          key: history[i].categoryId,
          value: history[i].amount,
        });
      }
    }

    return result;
  };

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
                          (x) => x.id === uuidv4() // TODO: change to normal date selector
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
          <View
            className={
              "flex border rounded-3xl justify-center" +
              (accounts.length === 0 ? " h-40 relative w-96" : " w-60")
            }
          >
            <TouchableOpacity
              className="justify-center m-auto border-2 rounded-full"
              onPress={() => navigation.navigate("AddCard")}
            >
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
                  (x) => x.id === uuidv4() // TODO: change to normal date selector
                )?.date ?? "No data"}
              </Text>
            </View>
            {/* chart */}
            {currentAccount && currentAccount.history.length > 0 ? (
              <View>
                <View className="m-auto py-5">
                  <PieChart
                    widthAndHeight={200}
                    series={getSumWithCategories(currentAccount.history).map(
                      (x) => x.value
                    )} // TODO: ref mb
                    sliceColor={getSumWithCategories(
                      currentAccount.history
                    ).map(
                      (x) =>
                        currentAccount.categories.find((c) => c.id == x.key)
                          ?.color ?? "#000000"
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
          <View className="flex-grow-0 py-3">
            <TouchableOpacity
              className="flex-row border rounded-2xl w-1/2 justify-center p-3 m-auto"
              onPress={() => navigation.navigate("MoreInfo")}
            >
              <MagnifyingGlassPlusIcon size={28} color="black" />
              <Text className="font-semibold text-xl pl-2">More</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </DefaultLayout>
  );
}
