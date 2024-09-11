import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigates/typeRootStack";
import { RouteProp } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SIZES } from "../common";
import { CartPickUpDetails } from "../components/cart";
import { OrderSummary } from "../components/Order";
import { PaymentForm } from "../components/Payment";
import { StripeProvider } from "@stripe/stripe-react-native";

//*** navigation&route ประกาศคุณสมบัติเส้นทางและการเรียกใช้พารามิเตอร์ที่ส่งมา
type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PaymentScreen"
>;

type AppRouteProp = RouteProp<RootStackParamList, "PaymentScreen">;

type Props = {
  navigation: AppNavigationProp;
  route: AppRouteProp;
};
//*** navigation&route ***

export default function PaymentScreen({ navigation, route }: Props) {
  const { state } = route.params;
  const [publishableKey, setPublishableKey] = useState("");

  const fetchPublishableKey = async () => {
    const key =
      "pk_test_51M9JKILEJFIvBBF2XkujZkrsfTEzCwhb6Mju4cg46E92bFLupZh7FxanSKa17WqSqpfl3WuQ1K3AL2VbK1wCrg9200hagD6XvF";
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider publishableKey={publishableKey}>
      <PaymentForm />
    </StripeProvider>
  );
}
