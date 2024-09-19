import { FC, useCallback, useState } from "react";
import { View, StyleSheet, TextInput,Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { debounce } from 'lodash';

interface Props {}

const MenuSearchBar: FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');

   // Create a debounced function
   const debouncedSearch = useCallback(
    
    debounce((text: string) => {
      setDebouncedValue(text);
    }, 500), // 500 ms debounce time
    []
  );

  // Handle input change
  const handleChange = (text: string) => {
    setSearchTerm(text);
    debouncedSearch(text);
  };
  
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={20} color={colors.primary} />
      <TextInput placeholder="Search here..." style={styles.textInput} onChangeText={handleChange} />
      <Text>Debounced Value: {debouncedValue}</Text>
    </View>
  );
};

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

export default MenuSearchBar;
