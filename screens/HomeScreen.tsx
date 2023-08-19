import {
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
  Image,
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
  AdjustmentsVerticalIcon,
  BookmarkIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";

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
      console.log(eventData);
    });
  }, []);

  return (
    <View className="relative flex-1">
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        <View className="h-[10%] flex-row justify-between items-end pb-3 px-4">
          <TouchableOpacity className="h-14 w-14 rounded-lg border border-purple-950 bg-purple-700">
            <CalendarIcon className="m-auto" size={53} color={"white"} />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="mx-auto text-purple-300">August 18, 2023</Text>
            <Text className="text-purple-100">Account name</Text>
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
          {/* balance */}
          <View className="h-[15%] w-[80%] bg-purple-200 m-auto rounded-xl items-center my-3">
            <Text className="text-green-700 m-auto text-lg">
              +9999999999999999
            </Text>
            <Text className="text-3xl m-auto">9999999999999999</Text>
            <Text className="text-red-700 m-auto text-lg">
              -9999999999999999
            </Text>
          </View>
          {/* chart */}
          {/* TODO: remove temp items */}
          <View className="flex-1 pb-6">
            <View className="rounded-full w-[250] h-[250] bg-purple-400 mx-auto mt-auto">
              <View className="rounded-full w-[150] h-[150] bg-white m-auto"></View>
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
            {/* history */}
            <TouchableOpacity
              className="w-24 h-24 border-4 rounded-2xl items-center justify-center"
              style={{ backgroundColor: theme.bgWhite(0.5) }}
            >
              <ClipboardDocumentListIcon size={60} color={"black"} />
            </TouchableOpacity>
            {/* income */}
            <TouchableOpacity
              className="w-24 h-24 border-4 border-green-600 rounded-2xl items-center justify-center"
              style={{ backgroundColor: theme.bgWhite(0.5) }}
            >
              <PlusIcon size={60} color={"green"} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
