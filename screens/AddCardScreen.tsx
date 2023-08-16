import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import DefaultLayout from "./DefaultLayout";
import {
  ArrowUpCircleIcon,
  ArrowUturnLeftIcon,
  SquaresPlusIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";
import { Category } from "../types";

import { v4 as uuidv4 } from "uuid";

export default function AddCardScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [categories, updateCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const addCategory = (name: string, color: string) => {
    let category: Category = { id: uuidv4(), color, name };
    categories.push(category);
    setNewCategoryName("");
  };

  return (
    <DefaultLayout>
      <View className="flex flex-col h-full">
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
          />
          <Text className="font-semibold text-xl mx-5 mb-1">
            Enter initial balance
          </Text>
          <TextInput
            keyboardType="numeric"
            className="rounded-2xl border p-3 mx-2 mb-3"
            placeholder="Initial balance"
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
            onPress={() => addCategory(newCategoryName, "#00ff11")}
          >
            <ArrowUpCircleIcon size={28} color="black" />
            <Text className="font-semibold text-xl pl-2">Add category</Text>
          </TouchableOpacity>
          <View className="flex flex-row my-3 items-center">
            <TextInput
              className="border rounded-2xl p-3"
              style={{ width: "85%" }}
              placeholder="Category name"
              defaultValue={newCategoryName}
              onChangeText={(newText) => setNewCategoryName(newText)}
            />
            <TouchableOpacity className="border rounded-full w-10 h-10 ml-auto" />
          </View>
          {/* category list */}
          <ScrollView className="h-1/6">
            {categories.map((category, index) => (
              <View key={index} className="flex-row mb-3 items-center">
                <TextInput
                  defaultValue={category.name}
                  className="border rounded-2xl p-3"
                  style={{ width: "85%" }}
                />
                <TouchableOpacity
                  className="border rounded-full w-10 h-10 ml-auto"
                  style={{ backgroundColor: category.color }}
                />
              </View>
            ))}
          </ScrollView>
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
          <TouchableOpacity className="flex-row border rounded-2xl w-2/5 justify-center p-3">
            <SquaresPlusIcon size={28} color="black" />
            <Text className="font-semibold text-xl pl-2">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DefaultLayout>
  );
}
