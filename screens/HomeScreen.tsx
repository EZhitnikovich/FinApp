import {
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";

import { Account, Category, CategoryTypes } from "../types/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { storageKey } from "../utils/constants";
import { getData, storeData } from "../utils/asyncStorage";
import {
  AdjustmentsVerticalIcon,
  BookmarkIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { v4 as uuidv4 } from "uuid";

let mockCategories: Category[] = [
  {
    categoryType: CategoryTypes.expense,
    color: "#ff0011",
    id: uuidv4(),
    name: "test1",
  },
  {
    categoryType: CategoryTypes.income,
    color: "#012011",
    id: uuidv4(),
    name: "test2",
  },
  {
    categoryType: CategoryTypes.expense,
    color: "#0f0f1f",
    id: uuidv4(),
    name: "test3",
  },
  {
    categoryType: CategoryTypes.expense,
    color: "#ffff00",
    id: uuidv4(),
    name: "test4",
  },
  {
    categoryType: CategoryTypes.expense,
    color: "#f0000f",
    id: uuidv4(),
    name: "test5",
  },

  {
    categoryType: CategoryTypes.income,
    color: "#ff0011",
    id: uuidv4(),
    name: "test6",
  },
  {
    categoryType: CategoryTypes.expense,
    color: "#012011",
    id: uuidv4(),
    name: "test7",
  },
  {
    categoryType: CategoryTypes.income,
    color: "#0f0f1f",
    id: uuidv4(),
    name: "test8",
  },
  {
    categoryType: CategoryTypes.income,
    color: "#ffff00",
    id: uuidv4(),
    name: "test9",
  },
  {
    categoryType: CategoryTypes.income,
    color: "#f0000f",
    id: uuidv4(),
    name: "test10",
  },
];

let mockAccoutns: Account[] = [
  { name: "testAccount", history: [] },
  { name: "testAccount2", history: [] },
];

export default function HomeScreen() {
  useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [accounts, setAccounts] = useState<Account[]>(mockAccoutns);
  const [currentAccount, selectAccount] = useState<Account>(accounts[0]);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>(mockCategories);

  // useEffect(() => {
  //   setLoading(true);
  //   const readData = async () => {
  //     let data = await getData(storageKey);
  //     if (data) {
  //       setAccounts(JSON.parse(data) as Account[]);
  //     }
  //   };
  //   readData().then(() => {
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        <View className="h-[10%] flex-row justify-between items-end pb-3 px-4">
          <TouchableOpacity className="h-14 w-14 rounded-lg border border-purple-950 bg-purple-700">
            <ClipboardDocumentListIcon
              className="m-auto"
              size={53}
              color={"white"}
            />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-purple-100">{currentAccount?.name}</Text>
          </View>
          <TouchableOpacity className="h-14 w-14 rounded-lg border border-purple-950 bg-purple-700">
            <AdjustmentsVerticalIcon
              className="m-auto"
              size={53}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
        <View
          className="flex-1"
          style={{ backgroundColor: theme.bgWhite(0.9) }}
        >
          <Text className="text-purple-700 mx-auto mt-3">August 18, 2023</Text>
          {/* balance */}
          <View className="h-[15%] w-[80%] bg-purple-200 m-auto rounded-xl items-center my-3 px-3 pb-1">
            <Text className="text-3xl m-auto border-b w-full text-center">
              {currentAccount
                ? currentAccount.history.reduce(
                    (prev, curr) => prev + curr.amount,
                    0
                  )
                : 0}
            </Text>
            <View className="flex-row justify-between w-full">
              <Text className="text-green-700 text-base">Income:</Text>
              <Text className="text-green-700 text-base">
                {currentAccount
                  ? currentAccount.history
                      .filter((x) => x.amount > 0)
                      .reduce((prev, curr) => prev + curr.amount, 0)
                  : 0}
              </Text>
            </View>
            <View className="flex-row justify-between w-full">
              <Text className="text-red-700 text-base">Expenses:</Text>
              <Text className="text-red-700 text-base">
                {currentAccount
                  ? currentAccount.history
                      .filter((x) => x.amount < 0)
                      .reduce((prev, curr) => prev + curr.amount, 0)
                  : 0}
              </Text>
            </View>
          </View>
          {/* chart */}
          {/* TODO: remove temp items */}
          <View className="flex-1 pb-6">
            <View className="rounded-full w-[200] h-[200] bg-purple-400 m-auto">
              <View className="rounded-full w-[120] h-[120] bg-white m-auto"></View>
            </View>
          </View>
          {/* legend */}
          {/* TODO: remove temp items */}
          <View className="bg-purple-300 h-[20%] w-[80%] mx-auto rounded-2xl px-3 py-1">
            <View className="flex-row">
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
            </View>
            <View className="flex-row">
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
            </View>
            <View className="flex-row">
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
            </View>
            <View className="flex-row">
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
              <View className="flex-row pb-2">
                <BookmarkIcon size={25} color={"black"} />
                <Text className="my-auto pl-2 pr-2">Category</Text>
              </View>
            </View>
          </View>
          {/* control */}
          <View className="flex-row justify-between w-[80%] py-6 flex-grow-0 mx-auto">
            {/* expenses */}
            <TouchableOpacity
              className="w-24 h-24 border-4 border-red-600 rounded-2xl items-center justify-center"
              style={{ backgroundColor: theme.bgWhite(0.5) }}
            >
              <MinusIcon size={60} color={"red"} />
            </TouchableOpacity>
            {/* income */}
            <TouchableOpacity
              className="w-24 h-24 border-4 border-green-600 rounded-2xl items-center justify-center"
              style={{ backgroundColor: theme.bgWhite(0.5) }}
              onPress={() =>
                currentAccount
                  ? navigation.navigate("Income", {
                      account: currentAccount,
                      categories: categories,
                    })
                  : {}
              }
            >
              <PlusIcon size={60} color={"green"} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
