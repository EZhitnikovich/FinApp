import { View, Text, TouchableOpacity } from "react-native";
import {
  CalendarIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { Account } from "../types";
import { v4 as uuidv4 } from "uuid";

type CardProps = {
  account: Account;
  onAccountSelected: (param: Account) => void;
};

export const Card = ({ account, onAccountSelected }: CardProps) => {
  return (
    <View className="w-screen">
      <View className="border rounded-2xl p-3 m-5">
        <Text className="text-2xl font-semibold border-b">{account.name}</Text>
        {/* balance */}
        <View className="flex-row mt-3 justify-between">
          <Text className="text-xl font-semibold">Balance:</Text>
          <View className="flex-row">
            <Text className="text-xl font-semibold pr-2">
              {`${account.balance}`.length > 13
                ? `${account.balance}`.slice(0, 12) + "..."
                : account.balance}
            </Text>
            <CreditCardIcon size={28} color="black" />
          </View>
        </View>
        {/* date */}
        <View className="flex-row justify-between">
          <Text className="text-black text-xl font-semibold">Last:</Text>
          <View className="flex-row">
            <Text className="text-black text-xl font-semibold pr-2">
              {account.history[account.history.length - 1]?.date ?? "No data"}
            </Text>
            <CalendarIcon size={28} color="black" />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onAccountSelected(account)}
          className="flex-row rounded-full border p-2 justify-center mt-2"
        >
          <MagnifyingGlassIcon size={28} color="black" />
          <Text className="text-xl">View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
