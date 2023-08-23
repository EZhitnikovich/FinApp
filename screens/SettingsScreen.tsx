import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowLeftCircleIcon, PlusIcon } from "react-native-heroicons/outline";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";
import { Category, CategoryTypes } from "../types";
import { ModalColorPicker } from "../components/modalColorPicker";
import { v4 as uuidv4 } from "uuid";

export default function SettingsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, "Settings">>();
  const [categories] = useState(route.params!.categories);
  const [showModal, toggleModal] = useState(false);
  const [categoryType] = useState(CategoryTypes.expense);
  const [categoryName, setCategoryName] = useState("");
  const [showPicker, togglePicker] = useState(false);
  const [color, setColor] = useState("#ff0099");

  function addCategory(): void {
    if (categoryName.length === 0)
      Alert.alert("Category name", "Enter category name");
    let cat: Category = {
      categoryType: categoryType,
      color: color,
      id: uuidv4(),
      name: categoryName,
    };
    categories.push(cat);
    toggleModal(false);
  }

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        <View className="h-[10%] flex-row justify-between items-end pb-3 px-4">
          <Text className="absolute text-center w-screen text-purple-200 text-xl pb-2">
            Settings
          </Text>
          <TouchableOpacity
            className="h-14 w-14 rounded-lg border border-purple-950 bg-purple-700"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftCircleIcon className="m-auto" size={53} color={"white"} />
          </TouchableOpacity>
        </View>
        <View
          className="flex-1 py-5"
          style={{ backgroundColor: theme.bgWhite(0.9) }}
        >
          <TouchableOpacity
            className="w-[80%] h-12 border-2 border-black rounded-2xl items-center justify-between mx-auto flex-row px-2"
            style={{ backgroundColor: theme.bgWhite(0.2) }}
            onPress={() => toggleModal(!showModal)}
          >
            <Text className="text-xl text-purple-700 border-purple-700">
              Add category
            </Text>
            <PlusIcon size={40} color={"purple"} />
          </TouchableOpacity>
          <Modal transparent={true} visible={showModal}>
            <View
              className="flex-1 justify-center items-center"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <View className="h-2/3 w-2/3 bg-white rounded-2xl">
                <Text className="text-center text-base mt-2">Add category</Text>
                <View className="w-[80%] mx-auto mt-2">
                  <Text className="text-base">Categroy title</Text>
                  <TextInput
                    placeholder="enter categroy title"
                    className="border rounded"
                    onChangeText={(t) => setCategoryName(t)}
                  />
                  <TouchableOpacity
                    className="w-full h-8 border rounded mt-2"
                    style={{ backgroundColor: color }}
                    onPress={() => togglePicker(!showPicker)}
                  />
                  <ModalColorPicker
                    isVisible={showPicker}
                    onColorSelected={(s) => {
                      setColor(s);
                      togglePicker(false);
                    }}
                    defaultColor={color}
                  />
                  <View className="flex-row justify-between mt-2">
                    <TouchableOpacity className="border rounded bg-purple-200 p-3">
                      <Text className="text-base">Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border rounded bg-purple-200 p-3">
                      <Text className="text-base">Expense</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="w-[90%] bg-purple-300 rounded-2xl p-2 border mx-auto mb-5 mt-auto">
                  <Text className="text-purple-900 text-base">
                    Type: {categoryType}
                  </Text>
                  <Text className="text-purple-900 text-base">
                    Name: {categoryName}
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-purple-200 rounded-lg w-[80%] mx-auto mb-5"
                  onPress={() => addCategory()}
                >
                  <Text className="text-xl text-center">Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
}
