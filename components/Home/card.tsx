import { View, Text, TouchableOpacity } from "react-native";
import {
  CalendarIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { Account } from "../../types";
import { v4 as uuidv4 } from "uuid";

type CardProps = {
  account: Account;
  accountSelector: (param: Account) => void;
};

export const Card = ({ account, accountSelector }: CardProps) => {
  return (
    <View className="w-60 rounded-3xl p-3 space-y-1 border mr-5">
      <Text className="text-black text-2xl border-b-2 font-semibold">
        {account.name.length > 15
          ? account.name.slice(0, 16) + "..."
          : account.name}
      </Text>
      {/* balance */}
      <View className="flex-row justify-between">
        <Text className="text-black text-base font-semibold">Balance:</Text>
        <View className="flex-row">
          <Text className="text-black text-base font-semibold pr-1">
            {`${account.balance}`.length > 13
              ? `${account.balance}`.slice(0, 11) + "..."
              : account.balance}
          </Text>
          <CreditCardIcon color="black" />
        </View>
      </View>
      {/* modification date */}
      <View className="flex-row justify-between">
        <Text className="text-black text-base font-semibold">Last:</Text>
        <View className="flex-row">
          <Text className="text-black text-base font-semibold pr-1">
            {account.history.find(
              (x) => x.id === uuidv4() // TODO: change to normal date selector
            )?.date ?? "No data"}
          </Text>
          <CalendarIcon color="black" />
        </View>
      </View>
      {/* View button */}
      <TouchableOpacity
        onPress={() => accountSelector(account)}
        className="flex-row rounded-full border p-2 justify-center"
      >
        <MagnifyingGlassIcon size={25} color="black" />
        <Text className="font-semibold text-base">View</Text>
      </TouchableOpacity>
    </View>
  );
};
