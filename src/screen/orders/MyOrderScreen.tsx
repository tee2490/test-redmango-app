import React from "react";
import { Text, View, FlatList } from "react-native";
import styles from "./MyOrderScreen.style";
import { OrderList } from "../../components/order";
import { MainLoader } from "../../common";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigates/typeRootStack";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetAllOrdersQuery } from "../../redux/apis/orderApi";
import { BackBtn1 } from "../../ui";

export default function MyOrderScreen() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery({ userId });
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <BackBtn1 onPress={() => navigate("ProfileScreen")} />
        <Text style={styles.titletxt}>
          Orders ({!isLoading && data?.apiResponse.result.length} items)
        </Text>
      </View>

      {isLoading && <MainLoader />}

      {!isLoading && (
        <FlatList
          data={data?.apiResponse.result}
          renderItem={({ item }) => (
            <OrderList
              key={item.orderHeaderId.toString()}
              orderData={item}
              isLoading={isLoading}
            />
          )}
        />
      )}
    </View>
  );
}
