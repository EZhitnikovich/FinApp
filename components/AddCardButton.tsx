import { TouchableOpacity, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";

type AddCardButtonProps = {
  onPress: () => void;
};

export const AddCardButton = ({ onPress }: AddCardButtonProps) => {
  return (
    <View className="flex-1 border rounded-2xl p-3 m-5">
      <TouchableOpacity
        className="justify-center m-auto border-2 rounded-full"
        onPress={() => onPress()}
      >
        <PlusIcon size={75} color="black" />
      </TouchableOpacity>
    </View>
  );
};
