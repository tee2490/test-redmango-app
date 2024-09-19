import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import styles from "./MenuItemList.style";
import { useDispatch, useSelector } from "react-redux";
import { useGetMenuItemsQuery } from "../../redux/apis/menuItemApi";
import { setMenuItem } from "../../redux/menuItemSlice";
import { MainLoader } from "../../common";
import { menuItemModel } from "../../interfaces";
import { RootState } from "../../redux/store";
import { MenuCategoryList } from "../menu";

export default function MenuItemList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );
  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(searchValue);
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  const handleFilters = (search: string) => {
    let tempMenuItems = [...data.result];

    //search functionality
    if (search) {
      const tempSearchMenuItems = [...tempMenuItems];
      tempMenuItems = tempSearchMenuItems.filter((item: menuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }
    return tempMenuItems;
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data?.result));
      setMenuItems(data.result);

      const tempCategoryList = ["All"];
      data.result.forEach((item: menuItemModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category);
        }
      });
      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <View>
      <View style={styles.categoryContainer}>
        <MenuCategoryList categoryList={categoryList} />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          numColumns={2}
          renderItem={({ item }) => <MenuItemCard menuItem={item} />}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
}
