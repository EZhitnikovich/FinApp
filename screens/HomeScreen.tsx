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
import { v4 as uuidv4 } from "uuid";

import {
  MagnifyingGlassPlusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";

import { Account } from "../types/index";
import DefaultLayout from "./DefaultLayout";
import { Legend } from "../components/Home/legend";
import { Chart } from "../components/Home/chart";
import { Card } from "../components/Home/card";
import { SafeAreaView } from "react-native-safe-area-context";
import { storageKey } from "../utils/constants";
import { getData, storeData } from "../utils/asyncStorage";

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [accounts, setAccounts] = useState<Account[]>();
  const [currentAccount, selectAccount] = useState<Account | null>();
  const [loading, setLoading] = useState(true);

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

  return (
    <DefaultLayout>
      {loading ? (
        <SafeAreaView className="m-auto flex">
          <Text className="text-black text-4xl align-middle">Loading...</Text>
        </SafeAreaView>
      ) : (
        <SafeAreaView className="flex flex-col h-full pt-1">
          {/* accounts */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="border-b pb-2 flex-grow-0"
          >
            {/* account */}
            {accounts && accounts.length > 0
              ? accounts.map((account, index) => (
                  <Card
                    key={index}
                    account={account}
                    accountSelector={selectAccount}
                  />
                ))
              : null}
            {/* TODO: full screen if length 0 */}
            {/* add account */}
            <View
              className={
                "flex border rounded-3xl justify-center" +
                (accounts && accounts.length === 0 ? " h-full w-96" : " w-60")
              }
            >
              <TouchableOpacity
                className="justify-center m-auto border-2 rounded-full"
                onPress={() => {
                  let a = accounts ? accounts : [];
                  return navigation.navigate("AddCard", { accounts: a });
                }}
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
                  <Chart
                    categories={currentAccount.categories}
                    history={currentAccount.history}
                  />
                  {/* legend */}
                  {currentAccount.categories.length > 0 ? (
                    <Legend categories={currentAccount.categories} />
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
        </SafeAreaView>
      )}
    </DefaultLayout>
  );
}
