import { FlatList, View, Text } from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/outline";
import { Category, CategoryTypes, Transaction } from "../types";

type LegendProps = {
  history: Transaction[];
  categories: Category[];
  type: CategoryTypes;
};

export const Legend = ({ history, categories, type }: LegendProps) => {
  let lst = categories.filter((x) => x.categoryType === type);
  let hist = history.filter((x) => lst.find((c) => c.id === x.categoryId));
  let totalSum = hist.reduce((prev, cur) => (prev += Math.abs(cur.amount)), 0);

  let categoriesWithPercent: {
    categroyId: string;
    categroyName: string;
    categoryColor: string;
    value: number;
    percent: number;
  }[] = [];

  for (let i = 0; i < hist.length; i++) {
    let val = categoriesWithPercent.find(
      (x) => x.categroyId === hist[i].categoryId
    );

    if (val) {
      val.value += Math.abs(hist[i].amount);
      val.percent = val.value / totalSum;
    } else {
      let category = categories.find((c) => c.id == hist[i].categoryId);
      categoriesWithPercent.push({
        categoryColor: category!.color,
        categroyId: hist[i].categoryId,
        categroyName: category!.name,
        value: Math.abs(hist[i].amount),
        percent: Math.abs(hist[i].amount) / totalSum,
      });
    }
  }

  return (
    <FlatList
      persistentScrollbar={true}
      showsVerticalScrollIndicator={true}
      data={categoriesWithPercent}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item }) => (
        <View style={{ flex: 1 / 3 }} className="flex-row py-1">
          <BookmarkSquareIcon size={28} color={item.categoryColor} />
          <Text className="text-lg">
            {item.categroyName.length > 10
              ? item.categroyName.slice(0, 9) + "..."
              : item.categroyName}
          </Text>
          <Text className="ml-auto text-lg">
            {Math.round(item.percent * 100) + "%"}
          </Text>
        </View>
      )}
    />
  );
};
