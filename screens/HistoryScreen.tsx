import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import {
  ArrowLeftCircleIcon,
  BookmarkSquareIcon,
  TrashIcon,
} from "react-native-heroicons/outline";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/Navigation";
import { Category } from "../types";

export default function HistoryScreen() {
  useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, "History">>();
  const categories = route.params!.categories;
  const [history, setHistory] = useState(route.params!.history);

  let hist: {
    day: string;
    transactions: {
      id: string;
      categoryId: string;
      amount: number;
      note: string;
    }[];
  }[] = [];

  for (let i = 0; i < history.length; i++) {
    let val = hist.find(
      (x) =>
        x.day ===
        `${history[i].date.day}-${history[i].date.month}-${history[i].date.year}`
    );

    if (val) {
      val.transactions.push({
        amount: history[i].amount,
        categoryId: history[i].categoryId,
        id: history[i].id,
        note: history[i].note,
      });
    } else {
      hist.push({
        day: `${history[i].date.day}-${history[i].date.month}-${history[i].date.year}`,
        transactions: [
          {
            amount: history[i].amount,
            categoryId: history[i].categoryId,
            id: history[i].id,
            note: history[i].note,
          },
        ],
      });
    }
  }

  const removeTransaction = (id: string) => {
    let index = history.findIndex((x) => x.id === id);
    history.splice(index, 1);
    setHistory([...history]);
  };

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
            History
          </Text>
          <TouchableOpacity
            className="h-14 w-14 rounded-lg border border-purple-950 bg-purple-700"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftCircleIcon className="m-auto" size={53} color={"white"} />
          </TouchableOpacity>
        </View>
        <View
          className="flex-1"
          style={{ backgroundColor: theme.bgWhite(0.9) }}
        >
          <FlatList
            persistentScrollbar={true}
            showsVerticalScrollIndicator={true}
            data={hist}
            keyExtractor={(item) => item.day}
            renderItem={({ item }) => (
              <View>
                <Text className="text-center text-purple-600 text-xl my-2">
                  {item.day}
                </Text>
                {item.transactions.map((x) => {
                  let category = categories.find((c) => c.id === x.categoryId);
                  return (
                    <View
                      key={x.id}
                      className="w-[80%] rounded-lg bg-purple-300 mx-auto mb-2 py-2 px-4"
                    >
                      <View className="flex-row justify-between border-b border-purple-900">
                        <View className="flex-row">
                          <BookmarkSquareIcon
                            size={28}
                            color={category?.color}
                          />
                          <Text className="text-lg">{category?.name}</Text>
                        </View>
                        <TouchableOpacity>
                          <TrashIcon
                            color={"black"}
                            size={28}
                            onPress={() => removeTransaction(x.id)}
                          />
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-between">
                        <Text className="text-lg">{x.amount}</Text>
                        <Text className="text-lg">
                          {x.note.length > 15
                            ? x.note.slice(0, 14) + "..."
                            : x.note}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
