import React from "react";
import { Text, View, FlatList } from "react-native";
import styles from "./MyOrderScreen.style";
import { OrderList } from "../../components/order";
import { MainLoader } from "../../common";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigates/typeRootStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetAllOrdersQuery } from "../../redux/apis/orderApi";
import { BackBtn1 } from "../../ui";

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
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery(userId);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <BackBtn1 onPress={() => navigation.goBack()} />
        <Text style={styles.titletxt}>
          Orders ({!isLoading && data.result.length} items)
        </Text>
      </View>

      {isLoading && <MainLoader />}

      {!isLoading && (
        <FlatList
          data={data.result}
          keyExtractor={(item) => item.orderHeaderId}
          renderItem={({ item }) => (
            <OrderList orderData={item} isLoading={isLoading} />
          )}
        />
      )}
    </View>
  );
}
