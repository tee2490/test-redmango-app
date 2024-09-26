import { View, StyleSheet, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { setSearchItem } from "../../redux/menuItemSlice";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function MenuSearchBar() {
  const dispatch = useDispatch();
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  // Create a debounced function
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setDebouncedValue(text);
    }, 500), // 500 ms debounce time
    []
  );
  
  // Handle input change
  const handleChange = (text: string) => {
    debouncedSearch(text);
  };

  useEffect(() => {
    dispatch(setSearchItem(debouncedValue));
  }, [debouncedValue]);

  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={20} color={colors.primary} />
      <TextInput
        placeholder="Search here..."
        style={styles.textInput}
        onChangeText={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    padding: 10,
  },
  textInput: {
    paddingLeft: 10,
    flex: 1,
    color: colors.primary,
    fontSize: 18,
  },
});
