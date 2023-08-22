import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import {
  ArrowLeftCircleIcon,
  ArrowSmallDownIcon,
  CheckCircleIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { BookmarkIcon } from "react-native-heroicons/solid";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";
import NumberKeyboard from "../components/Keyboard";
import { Category, CategoryTypes, Transaction } from "../types";
import { v4 as uuidv4 } from "uuid";

export default function OperationScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const route = useRoute<RouteProp<RootStackParams, "Operation">>();
  const account = route.params!.account;
  const categories = route.params!.categories;

  const [amount, setAmount] = useState("0");
  const [operationType, setOperationType] = useState<CategoryTypes>(
    CategoryTypes.expense
  );
  const [note, setNote] = useState("");
  const [categoryListOpened, toggleCategoryList] = useState(false);
  const [currentCategory, selectCategory] = useState<Category>();

  const setCategory = (id: string) => {
    let category = categories.find((x) => x.id === id);
    if (category) {
      selectCategory(category);
    }
  };

  const addTransaction = () => {
    if (amount === "0") {
      Alert.alert("Amount error", "Enter amount");
      return;
    }
    if (!currentCategory) {
      Alert.alert("Category error", "Select category");
      return;
    }
    let numAmount = Number(amount);
    if (!Number.isNaN(numAmount)) {
      let now = new Date();
      if (operationType === CategoryTypes.expense) numAmount *= -1;
      let transaction: Transaction = {
        amount: numAmount,
        note: note,
        categoryId: currentCategory ? currentCategory.id : "",
        date: {
          day: now.getDate(),
          month: now.getMonth(),
          year: now.getFullYear(),
        },
        id: uuidv4(),
      };
      account.history.push(transaction);
    }
    navigation.navigate("Home");
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        <View className="h-[10%] flex-row items-end pb-3 px-4 justify-between">
          <TouchableOpacity
            className="h-14 w-14 rounded-lg border border-purple-950 bg-purple-700"
            onPress={() => navigation.navigate("Home")}
          >
            <ArrowLeftCircleIcon className="m-auto" size={53} color={"white"} />
          </TouchableOpacity>
          <Text className="text-purple-200 text-xl text-center">
            New {operationType === CategoryTypes.expense ? "expense" : "income"}
          </Text>
          <TouchableOpacity
            className="h-14 w-14 rounded-lg border border-purple-950 bg-purple-700"
            onPress={() => {
              addTransaction();
            }}
          >
            <CheckCircleIcon className="m-auto" size={53} color={"white"} />
          </TouchableOpacity>
        </View>
        <View
          className="flex-1"
          style={{ backgroundColor: theme.bgWhite(0.9) }}
        >
          <View className="flex-row justify-between mx-10 mt-3">
            <TouchableOpacity
              className="h-10 flex-1 border border-purple-700 rounded-md bg-purple-100 mx-1"
              disabled={operationType === CategoryTypes.income}
              onPress={() => setOperationType(CategoryTypes.income)}
            >
              <Text className="text-xl text-purple-700 m-auto">New income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-10 flex-1 border border-purple-700 rounded-md mx-1 bg-purple-100"
              disabled={operationType === CategoryTypes.expense}
              onPress={() => setOperationType(CategoryTypes.expense)}
            >
              <Text className="text-xl text-purple-700 m-auto">
                New expense
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1 justify-evenly">
            <View className="flex-row w-[90%] h-16 border border-purple-900 justify-between items-center rounded-lg bg-purple-300 mx-auto">
              {operationType === CategoryTypes.income ? (
                <PlusIcon size={50} color={"purple"} />
              ) : (
                <MinusIcon size={50} color={"purple"} />
              )}
              <Text className="text-purple-800 font-semibold text-3xl">
                {amount}
              </Text>
            </View>
            <View className="w-[90%] mx-auto flex-row border-b border-purple-900">
              <Text className="text-base text-purple-700 my-auto">Note: </Text>
              <TextInput
                defaultValue={note}
                onChangeText={(value) => setNote(value)}
                className="flex-1 text-base text-blue-700"
                placeholder="enter note"
              />
            </View>
            <View className="w-[60%] mx-auto rounded-lg bg-purple-200 h-10 z-50">
              <TouchableOpacity
                className="flex-row flex-1 justify-between items-center px-3"
                onPress={() => toggleCategoryList(!categoryListOpened)}
              >
                <Text className="text-base text-purple-700">
                  {currentCategory ? currentCategory.name : "Select category"}
                </Text>
                <ArrowSmallDownIcon size={20} color={"black"} />
              </TouchableOpacity>
            </View>
          </View>
          <Modal transparent={true} visible={categoryListOpened}>
            <View
              className="flex-1 justify-center items-center"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <View className="h-1/2 w-2/3 bg-white rounded-2xl">
                <ScrollView className="flex-1 border mx-5 mt-7 border-r bg-purple-100 rounded-lg">
                  {categories
                    .filter((x) => x.categoryType === operationType)
                    .map((category, index) => {
                      let selected =
                        currentCategory && category.id === currentCategory.id;
                      let bgColor = selected ? "bg-purple-300" : "";
                      return (
                        <TouchableOpacity
                          key={index}
                          className={`border-b flex-row ${bgColor} p-2`}
                          onPress={() => setCategory(category.id)}
                        >
                          <BookmarkIcon size={28} color={category.color} />
                          <Text className="text-xl pl-2 text-purple-700">
                            {category.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
                <TouchableOpacity
                  className="h-[15%] border bg-purple-200 mx-12 my-7 justify-center items-center rounded-2xl"
                  onPress={() => toggleCategoryList(false)}
                >
                  <Text className="text-xl text-purple-700">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View className="flex-1">
            <NumberKeyboard
              onInputChanged={setAmount}
              startValue={amount}
              maxLength={9}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
