import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { menuItemModel } from "../../interfaces";
import styles from "./MenuItemCard.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { baseUrl } from "../../constants/SD";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigates/typeRootStack";

interface Props {
  menuItem: menuItemModel;
}

export default function MenuItemCard(item: Props) {
  //RootStackParamList เรียกใช้รูปแบบพารามิเตอร์สำหรับส่งไปยังอีก screen
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  
  return (
    <TouchableOpacity onPress={() => navigate('MenuItemDetailScreen',{item : item.menuItem})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: baseUrl + item.menuItem.image,
            }}
            style={styles.image}
          />
          {item.menuItem.specialTag.length > 0 && (
            <View style={styles.specialTagContainer}>
              <Ionicons name="star-outline" size={15} color={COLORS.white} />
              <Text style={styles.specialTag} numberOfLines={1}>
                {item.menuItem.specialTag}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.detail}>
          <Text style={styles.name} numberOfLines={1}>
            {item.menuItem.name}
          </Text>
          <Text style={styles.catgory} numberOfLines={1}>
            {item.menuItem.category}
          </Text>
          <Text style={styles.price}>${item.menuItem.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
