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
import { SD_SortTypes } from "../../common/SD";

export default function MenuItemList() {
  const [fetching, setFetching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categoryList, setCategoryList] = useState([""]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );
  const sortValue = useSelector((state: RootState) => state.menuItemStore.sort);

  const onRefreshData = () => {
    setFetching(true);
    if (data && selectedCategory === "All") {
      setMenuItems(data.result);
    }
    setFetching(false);
  };

  //เมื่อเลือกประเภท หรือ คำค้น ให้ทำการกรองข้อมูลใหม่
  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(
        sortValue,
        selectedCategory,
        searchValue
      );
      setMenuItems(tempMenuArray);
    }
  }, [selectedCategory, searchValue, sortValue]);

  const handleFilters = (
    sortType: SD_SortTypes,
    category: string,
    search: string
  ) => {
    let tempArray =
      category === "All"
        ? [...data.result]
        : data.result.filter(
            (item: menuItemModel) =>
              item.category.toUpperCase() === category.toUpperCase()
          );

    //search functionality
    if (search) {
      const tempSearchMenuItems = [...tempArray];
      tempArray = tempSearchMenuItems.filter((item: menuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    //sort
    if (sortType === SD_SortTypes.PRICE_LOW_HIGH) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => a.price - b.price);
    }
    if (sortType === SD_SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price);
    }
    if (sortType === SD_SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SD_SortTypes.NAME_Z_A) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
      );
    }

    return tempArray;
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
    else
    {
      //เมื่อเกิด CRUD ทำการปรับข้อมูลให้เป็นปัจจุบัน
      data && setMenuItems(data.result)
    }
  }, [isLoading,data.result]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <View>
      <View style={styles.categoryContainer}>
        <MenuCategoryList
          categoryList={categoryList}
          setSelectedCategory={setSelectedCategory}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          refreshing={fetching}
          onRefresh={onRefreshData}
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
