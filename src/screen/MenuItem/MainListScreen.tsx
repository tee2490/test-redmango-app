import { FlatList, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./MainListScreen.style";
import { MainCard } from "../../components/menu";
import { BackBtn1 } from "../../ui";
import { COLORS } from "../../common";
import { Ionicons } from "@expo/vector-icons";

export default function MainListScreen() {
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

      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ item }) => <MainCard />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
