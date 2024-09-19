import { View, StyleSheet } from "react-native";
import React from "react";
import { MenuItemList } from "../components/home";
import { COLORS, SIZES } from "../common";
import SearchBar from "../components/menu/MenuSearchBar";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar />
      </View>
      <MenuItemList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: SIZES.small / 2,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    margin: SIZES.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
