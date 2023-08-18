import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";
import { Category, Transaction } from "../../types";

type ChartProps = {
  history: Transaction[];
  categories: Category[];
};

export const Chart = ({ history, categories }: ChartProps) => {
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

  let sumWithCategories = getSumWithCategories(history);

  return history.length > 0 ? (
    <View className="m-auto py-5">
      <PieChart
        widthAndHeight={200}
        series={sumWithCategories.map((x) => x.value)}
        sliceColor={sumWithCategories.map(
          (x) => categories.find((c) => c.id == x.key)?.color ?? "#000000"
        )}
        coverRadius={0.6}
      />
    </View>
  ) : (
    <View className="flex flex-1 items-center justify-center">
      <Text className="font-semibold text-4xl">No data</Text>
    </View>
  );
};
