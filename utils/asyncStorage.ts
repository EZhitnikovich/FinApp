import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async <T>(key: string, value: T) => {
  try {
    let str = JSON.stringify(value);
    await AsyncStorage.setItem(key, str);
  } catch (error) {
    console.log("Error storing value", error);
  }
};

export const getData = async (key: string) => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
  } catch (error) {
    console.log("Error retrieving value", error);
  }
};
