import { FlatList, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import styles from "./MenuItemList.style";
import { useDispatch } from "react-redux";
import { useGetMenuItemsQuery } from "../../redux/apis/menuItemApi";
import { setMenuItem } from "../../redux/menuItemSlice";
import { MainLoader } from "../../common";

export default function MenuItemList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data?.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader/>
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.result}
        numColumns={2}
        renderItem={({ item }) => <MenuItemCard menuItem={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
