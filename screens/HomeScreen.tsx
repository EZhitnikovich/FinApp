import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";

import { Account } from "../types/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { storageKey } from "../utils/constants";
import { getData, storeData } from "../utils/asyncStorage";
import {
  CreditCardIcon,
  MagnifyingGlassPlusIcon,
} from "react-native-heroicons/outline";
import { Card } from "../components/card";
import { AddCardButton } from "../components/AddCardButton";
import { Chart } from "../components/chart";
import { Legend } from "../components/legend";

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [accounts, setAccounts] = useState<Account[]>();
  const [currentAccount, selectAccount] = useState<Account | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const readData = async () => {
      let data = await getData(storageKey);
      if (data) {
        setAccounts(JSON.parse(data) as Account[]);
      }
    };
    readData().then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    DeviceEventEmitter.addListener("testEvent", (eventData: Account[]) => {
      setAccounts(eventData);
      storeData(storageKey, JSON.stringify(eventData));
    });
  }, []);

  return !loading ? (
    accounts && accounts.length > 0 ? (
      <SafeAreaView className="flex h-full">
        {/* accounts */}
        {/* TODO: make partial accounts load */}
        <ScrollView
          className="flex-grow-0"
          persistentScrollbar={true}
          showsHorizontalScrollIndicator={true}
          horizontal={true}
          pagingEnabled={true}
        >
          {accounts.map((item, index) => (
            <Card
              account={item}
              key={index}
              onAccountSelected={(acc) => selectAccount(acc)}
            />
          ))}
          {/* add account */}
          <View className="w-screen">
            <AddCardButton
              onPress={() =>
                navigation.navigate("AddCard", { accounts: accounts })
              }
            />
          </View>
        </ScrollView>
        {/* info */}
        {currentAccount ? (
          <View className="flex-1 border rounded-2xl p-3 m-5">
            <Text className="text-center text-3xl font-semibold border-b">
              {currentAccount?.name}
            </Text>
            <View className="flex-row mt-5 justify-between">
              <Text className="text-2xl">Balance:</Text>
              <View className="flex-row justify-end">
                <Text className="text-2xl pr-2">{currentAccount.balance}</Text>
                <CreditCardIcon size={32} color={"black"} />
              </View>
            </View>
            {/* chart */}
            <Chart
              categories={currentAccount.categories}
              history={currentAccount.history}
            />
            {currentAccount.categories.length > 0 ? (
              <View className="flex-grow-0 h-[30%] mb-2 border rounded-2xl p-3">
                <Legend categories={currentAccount.categories} />
              </View>
            ) : null}
            {/* control */}
            <TouchableOpacity className="flex-row border rounded-2xl justify-center p-2 mt-2">
              <MagnifyingGlassPlusIcon size={28} color="black" />
              <Text className="text-xl">More</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex flex-1 items-center justify-center border rounded-2xl m-5">
            <Text className="font-semibold text-4xl">Select account</Text>
          </View>
        )}
      </SafeAreaView>
    ) : (
      <SafeAreaView className="flex h-full">
        <AddCardButton
          onPress={() => navigation.navigate("AddCard", { accounts: [] })}
        />
      </SafeAreaView>
    )
  ) : (
    <SafeAreaView className="flex flex-1 items-center justify-center">
      <Text className="font-semibold text-4xl">Loading...</Text>
    </SafeAreaView>
  );
}
