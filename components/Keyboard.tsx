import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";

type KeyboardProps = {
  onInputChanged?: (val: string) => void;
  startValue: string;
  maxLength?: number;
};

export default function NumberKeyboard({
  onInputChanged,
  startValue,
  maxLength,
}: KeyboardProps) {
  function handlePress(key: string): void {
    let includesDot = startValue.includes(".");
    if (key !== ".") {
      if (includesDot && startValue[startValue.length - 3] === ".") return;
      if (maxLength && includesDot && startValue.length > maxLength + 2) return;
      else if (maxLength && !includesDot && startValue.length >= maxLength)
        return;
    } else {
      if (includesDot) return;
    }
    startValue === "0" && key !== "."
      ? (startValue = key)
      : (startValue += key);
    onInputChanged ? onInputChanged(startValue) : null;
  }

  function handleRemove(): void {
    startValue = startValue.slice(0, -1);
    if (startValue.length === 0) {
      startValue = "0";
    }
    if (onInputChanged) {
      onInputChanged(startValue);
    }
  }

  return (
    <View className="h-full">
      <View className="flex-row w-full flex-1">
        <CalcButton name="1" onPress={(value) => handlePress(value)} />
        <CalcButton name="2" onPress={(value) => handlePress(value)} />
        <CalcButton name="3" onPress={(value) => handlePress(value)} />
      </View>
      <View className="flex-row w-full flex-1">
        <CalcButton name="4" onPress={(value) => handlePress(value)} />
        <CalcButton name="5" onPress={(value) => handlePress(value)} />
        <CalcButton name="6" onPress={(value) => handlePress(value)} />
      </View>
      <View className="flex-row w-full flex-1">
        <CalcButton name="7" onPress={(value) => handlePress(value)} />
        <CalcButton name="8" onPress={(value) => handlePress(value)} />
        <CalcButton name="9" onPress={(value) => handlePress(value)} />
      </View>
      <View className="flex-row w-full flex-1">
        <CalcButton name="." onPress={(value) => handlePress(value)} />
        <CalcButton name="0" onPress={(value) => handlePress(value)} />
        <CalcButton name="⌫" onPress={() => handleRemove()} />
      </View>
    </View>
  );
}

type CalcButtonProps = {
  name: string;
  onPress?: (value: string, event?: GestureResponderEvent) => void;
};

const CalcButton = ({ name, onPress }: CalcButtonProps) => {
  return (
    <TouchableOpacity
      className="border rounded-md border-purple-800 bg-purple-100 flex-1 m-1"
      onPress={(event) => (onPress ? onPress(name, event) : () => {})}
    >
      <Text className="text-2xl m-auto text-purple-800">{name}</Text>
    </TouchableOpacity>
  );
};
