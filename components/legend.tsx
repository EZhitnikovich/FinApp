import { FlatList, View, Text } from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/outline";
import { Category } from "../types";

type LegendProps = {
  categories: Category[];
};

export const Legend = ({ categories }: LegendProps) => {
  return (
    <FlatList
      persistentScrollbar={true}
      showsVerticalScrollIndicator={true}
      numColumns={3}
      data={categories}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item }) => (
        <View style={{ flex: 1 / 3 }} className=" flex-row py-1">
          <BookmarkSquareIcon color={item.color} />
          <Text>
            {item.name.length > 10 ? item.name.slice(0, 9) + "..." : item.name}
          </Text>
        </View>
      )}
    />
  );
};
