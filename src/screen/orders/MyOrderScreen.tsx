import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./MyOrderScreen.style";
import { OrderList } from "../../components/order";
import { COLORS } from "../../common";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigates/typeRootStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//*** navigation&route ประกาศคุณสมบัติเส้นทางและการเรียกใช้พารามิเตอร์ที่ส่งมา
type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyOrderScreen"
>;

type AppRouteProp = RouteProp<RootStackParamList, "MyOrderScreen">;

type Props = {
  navigation: AppNavigationProp;
  route: AppRouteProp;
};
//*** navigation&route ***

export default function MyOrderScreen({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titletxt}>Orders</Text>
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item, index }) => <OrderList key={index} />}
      />
    </View>
  );
}
