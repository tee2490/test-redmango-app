import { View, Text } from "react-native";
import React from "react";
import { useGetOrderDetailsQuery } from "../../redux/apis/orderApi";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigates/typeRootStack";
import { RouteProp } from "@react-navigation/native";
import { OrderSummary } from "../../components/order";

//*** navigation&route ประกาศคุณสมบัติเส้นทางและการเรียกใช้พารามิเตอร์ที่ส่งมา
type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OrderDetailScreen"
>;

type AppRouteProp = RouteProp<RootStackParamList, "OrderDetailScreen">;

type Props = {
  navigation: AppNavigationProp;
  route: AppRouteProp;
};
//*** navigation&route ***

export default function OrderDetailScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const { data, isLoading } = useGetOrderDetailsQuery(id);
  let userInput, orderDetails;

  if (!isLoading && data?.result) {
    userInput = {
      name: data.result[0].pickupName,
      email: data.result[0].pickupEmail,
      phoneNumber: data.result[0].pickupPhoneNumber,
    };
    orderDetails = {
      id: data.result[0].orderHeaderId,
      cartItems: data.result[0].orderDetails,
      cartTotal: data.result[0].orderTotal,
      status: data.result[0].status,
    };
  }

  return (
    <View>
      {!isLoading && orderDetails && userInput && (
        <OrderSummary data={orderDetails} userInput={userInput} />
      )}
    </View>
  );
}
