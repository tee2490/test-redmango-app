import { FlatList, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./MainListScreen.style";
import { MainCard } from "../../components/menu";
import { BackBtn1 } from "../../ui";
import { COLORS, MainLoader } from "../../common";
import { Ionicons } from "@expo/vector-icons";
import { useGetMenuItemsQuery } from "../../redux/apis/menuItemApi";

export default function MainListScreen() {
  const { data, isLoading } = useGetMenuItemsQuery(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={{ flexDirection: "row" }}>
          <BackBtn1 size={35} onPress={() => {}} />
          <Text style={styles.titletxt}>MenuItem List</Text>
        </View>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="add-circle-sharp" size={35} color={COLORS.primary1} />
        </TouchableOpacity>
      </View>

      {isLoading && <MainLoader />}
      {!isLoading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.result}
          renderItem={({ item }) => <MainCard key={item.id} menuItem={item} />}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}
