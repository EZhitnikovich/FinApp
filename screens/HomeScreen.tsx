import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";

import { Account, Category, CategoryTypes } from "../types/index";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { v4 as uuidv4 } from "uuid";
import { Chart } from "../components/chart";
import { Legend } from "../components/legend";

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
          {/* income */}
          <TouchableOpacity
            className="w-[80%] h-12 border-2 border-black rounded-2xl items-center justify-center mx-auto"
            style={{ backgroundColor: theme.bgWhite(0.2) }}
            onPress={() =>
              currentAccount
                ? navigation.navigate("Income", {
                    account: currentAccount,
                    categories: categories,
                  })
                : {}
            }
          >
            <PlusIcon size={40} color={"black"} />
          </TouchableOpacity>
          {/* chart */}
          <View className="flex-1 pb-6">
            <Chart
              categories={categories}
              history={currentAccount.history}
              type={CategoryTypes.expense}
            />
          </View>
          {/* legend */}
          <View className="bg-purple-300 h-[30%] w-[80%] mx-auto rounded-2xl px-3 py-1 mb-6">
            <Legend
              categories={categories}
              history={currentAccount.history}
              type={CategoryTypes.expense}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
