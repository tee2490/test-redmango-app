import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigates/typeRootStack";
import { RouteProp } from "@react-navigation/native";
import { SIZES } from "../../common";

//*** navigation&route ประกาศคุณสมบัติเส้นทางและการเรียกใช้พารามิเตอร์ที่ส่งมา
type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OrderConfirmed"
>;

type AppRouteProp = RouteProp<RootStackParamList, "OrderConfirmed">;

type Props = {
  navigation: AppNavigationProp;
  route: AppRouteProp;
};
//*** navigation&route ***

export default function OrderConfirmed({ navigation, route }: Props) {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.icon}>✔️</Text>
          <Text style={styles.title}>Order has been Confirmed!</Text>
          <Text style={styles.subtitle}>Your order ID: {id} </Text>
          <Text>
            We will soon start to cook the delicious food you ordered.
          </Text>

          <Image
            source={require("../../Images/confirmed.jpg")}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: SIZES.xxLarge + 5,
    color: "green",
    alignSelf: "center",
  },
  textContainer: {
    paddingBottom: 50,
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.xLarge,
    color: "green",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: SIZES.large,
    marginTop: 10,
  },
  image: {
    height: 250,
    width: "100%",
    resizeMode: "cover",
  },
});
