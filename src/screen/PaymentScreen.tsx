import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigates/typeRootStack";
import { RouteProp } from "@react-navigation/native";
import { OrderSummary } from "../components/order";
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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.8 }}>
          <OrderSummary data={state.apiResult} userInput={state.userInput} />
        </View>
        <View style={{ flex: 0.2 }}>
          <PaymentForm clientSecret={state.apiResult.clientSecret}/>
        </View>
      </View>
    </StripeProvider>
  );
}
