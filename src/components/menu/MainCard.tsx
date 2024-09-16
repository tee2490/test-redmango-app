import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./MainCard.style";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../common";

export default function MenuCard() {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => {}}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://as2.ftcdn.net/v2/jpg/03/60/78/63/1000_F_360786351_kFYyEoHBzrtIIqg1BQlo0i3YR38B0M2a.jpg",
            }}
            style={styles.productImg}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.productTitle}>
            ID
          </Text>
          <Text numberOfLines={1} style={styles.productTitle}>
            NAME
          </Text>
          <Text numberOfLines={1} style={styles.productTitle}>
            CATEGORY
          </Text>
          <Text numberOfLines={1} style={styles.productTitle}>
            PRICE
          </Text>
          <Text numberOfLines={1} style={styles.productTitle}>
            SPECIAL TAG
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.productTxt}>
            01
          </Text>
          <Text numberOfLines={1} style={styles.productTxt}>
            NAME55555555555555555555
          </Text>
          <Text numberOfLines={1} style={styles.productTxt}>
            CATEGORY
          </Text>
          <Text numberOfLines={1} style={styles.productTxt}>
            PRICE
          </Text>
          <Text numberOfLines={1} style={styles.productTxt}>
            SPECIAL TAG
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: COLORS.success,
              borderRadius: 5,
              padding: 3,
              marginBottom: 5,
            }}
          >
            <AntDesign name="edit" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: COLORS.danger,
              borderRadius: 5,
              padding: 3,
            }}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
