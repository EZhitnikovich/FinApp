import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  DeviceEventEmitter,
} from "react-native";
import React, { useState } from "react";
import {
  ArrowUpCircleIcon,
  ArrowUturnLeftIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";
import { Account, Category } from "../types";

import { v4 as uuidv4 } from "uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalColorPicker } from "../components/modalColorPicker";

export default function AddCardScreen() {
  const route = useRoute<RouteProp<RootStackParams>>();
  const accounts = route.params?.accounts ?? [];
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [color, setColor] = useState("#00ff77");
  const [categories, updateCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [showPicker, togglePicker] = useState(false);

  const addCategory = (name: string, color: string) => {
    if (name.length === 0) return;
    let category: Category = { id: uuidv4(), color, name };
    categories.push(category);
    setNewCategoryName("");
  };

  const addAccount = () => {
    if (accountName.length > 0) {
      let newAccount: Account = {
        balance: Number.isNaN(accountBalance) ? 0 : accountBalance,
        categories: categories,
        history: [],
        name: accountName,
      };
      accounts.push(newAccount);

      DeviceEventEmitter.emit("testEvent", [...accounts]);
      navigation.navigate("Home");
    }
  };

  const removeById = (id: string) => {
    let arr = categories.filter((x) => x.id !== id);
    updateCategories(arr);
  };

  function setFloat(v: string, fun: (s: number) => void): void {
    if (/^[+-]?([0-9]*[.])?[0-9]+$/.test(v)) {
      fun(Number(v));
    }
  }

  return (
    <SafeAreaView className="flex flex-col h-full">
      {/* main */}
      <View className="border-b mx-3 flex-grow-0">
        <Text className="font-semibold text-3xl m-auto px-3 border-b my-3">
          Add new account
        </Text>
        <Text className="font-semibold text-xl mx-5 mb-1">
          Enter account name
        </Text>
        <TextInput
          className="rounded-2xl border p-3 mx-2 mb-3"
          placeholder="Account name"
          maxLength={20}
          defaultValue={accountName}
          onChangeText={(item) => setAccountName(item)}
        />
        <Text className="font-semibold text-xl mx-5 mb-1">
          Enter initial balance
        </Text>
        <TextInput
          keyboardType="numeric"
          className="rounded-2xl border p-3 mx-2 mb-3"
          placeholder="Initial balance"
          maxLength={10}
          defaultValue={String(accountBalance)}
          onChangeText={(item) => setFloat(item, setAccountBalance)}
        />
      </View>
      {/* categories */}
      <View className="flex-grow px-5">
        <Text className="font-semibold text-3xl m-auto px-3 border-b my-3">
          Add categories
        </Text>
        {/* add new category */}
        <TouchableOpacity
          className="flex-row border rounded-2xl justify-center p-3"
          onPress={() => addCategory(newCategoryName, color)}
        >
          <ArrowUpCircleIcon size={28} color="black" />
          <Text className="font-semibold text-xl pl-2">Add category</Text>
        </TouchableOpacity>
        <View className="flex flex-row my-3 items-center">
          <TextInput
            className="border rounded-2xl p-3 flex-1 mr-2"
            placeholder="Category name"
            defaultValue={newCategoryName}
            onChangeText={(newText) => setNewCategoryName(newText)}
          />
          <TouchableOpacity
            style={{ backgroundColor: color }}
            className="border rounded-full w-10 h-10 ml-auto"
            onPress={() => togglePicker(!showPicker)}
          />
        </View>
        <ModalColorPicker
          onColorSelected={(color) => {
            setColor(color);
            togglePicker(false);
          }}
          isVisible={showPicker}
          defaultColor={color}
        />
        {/* category list */}
        <FlatList
          className="h-1/6"
          data={categories}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => (
            <View className="flex-row mb-3 items-center">
              <TouchableOpacity
                className="border rounded-full w-10 h-10 mr-auto"
                onPress={() => removeById(item.id)}
              >
                <XMarkIcon color={"black"} size={38} />
              </TouchableOpacity>
              <Text className="border rounded-2xl px-3 py-4 flex-1 mx-2">
                {item.name.length > 38
                  ? item.name.slice(0, 37) + "..."
                  : item.name}
              </Text>
              <View
                className="border rounded-full w-10 h-10 ml-auto"
                style={{ backgroundColor: item.color }}
              />
            </View>
          )}
        />
      </View>
      {/* control */}
      <View className="flex-row flex-grow-0 justify-evenly py-3 mx-3 border-t">
        <TouchableOpacity
          className="flex-row border rounded-2xl w-2/5 justify-center p-3"
          onPress={() => navigation.navigate("Home")}
        >
          <ArrowUturnLeftIcon size={28} color="black" />
          <Text className="font-semibold text-xl pl-2">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row border rounded-2xl w-2/5 justify-center p-3"
          onPress={() => addAccount()}
        >
          <SquaresPlusIcon size={28} color="black" />
          <Text className="font-semibold text-xl pl-2">Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
