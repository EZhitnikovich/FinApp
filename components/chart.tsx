import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";
import { Category, CategoryTypes, Transaction } from "../types";

type ChartProps = {
  history: Transaction[];
  categories: Category[];
  type: CategoryTypes;
};

export const Chart = ({ history, categories, type }: ChartProps) => {
  var hist = history.filter(
    (x) => categories.find((c) => c.id === x.categoryId)?.categoryType === type
  );
  const getSumWithCategories = (history: Transaction[]) => {
    var result: {
      key: string;
      value: number;
    }[] = [];

    for (let i = 0; i < history.length; i++) {
      let val = result.find((x) => x.key === history[i].categoryId);
      if (val) {
        val.value += history[i].amount;
      } else {
        result.push({
          key: history[i].categoryId,
          value: history[i].amount,
        });
      }
    }

    return result;
  };

  let sumWithCategories = getSumWithCategories(hist);

  return sumWithCategories.length > 0 ? (
    <View className="m-auto py-5">
      <View>
        <PieChart
          widthAndHeight={200}
          series={sumWithCategories.map((x) => Math.abs(x.value))}
          sliceColor={sumWithCategories.map(
            (x) => categories.find((c) => c.id == x.key)?.color ?? "#000000"
          )}
          coverRadius={0.6}
        />
      </View>
    </View>
  ) : (
    <View className="rounded-full w-[200] h-[200] bg-purple-400 m-auto">
      <View className="rounded-full w-[120] h-[120] bg-white m-auto"></View>
    </View>
  );
};
