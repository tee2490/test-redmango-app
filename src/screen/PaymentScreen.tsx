import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigates/typeRootStack";
import { OrderSummary } from "../components/order";
import { PaymentForm } from "../components/Payment";
import { StripeProvider } from "@stripe/stripe-react-native";

type Props = NativeStackScreenProps<RootStackParamList, "PaymentScreen">;

export default function PaymentScreen({ route }: Props) {
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
          <OrderSummary payment={true} data={state.apiResult} userInput={state.userInput} />
        </View>
        <View style={{ flex: 0.2 }}>
          <PaymentForm
            data={state.apiResult}
            userInput={state.userInput}
            clientSecret={state.apiResult.clientSecret}
          />
        </View>
      </View>
    </StripeProvider>
  );
}
