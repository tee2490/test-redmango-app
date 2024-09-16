import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useGetAllOrdersQuery } from '../../redux/apis/orderApi';
import styles from './MyOrderScreen.style';
import { BackBtn1 } from '../../ui';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigates/typeRootStack';
import { RouteProp } from '@react-navigation/native';
import { MainLoader } from '../../common';
import { OrderList } from '../../components/order';

//*** navigation&route ประกาศคุณสมบัติเส้นทางและการเรียกใช้พารามิเตอร์ที่ส่งมา
type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllOrderScreen"
>;

type AppRouteProp = RouteProp<RootStackParamList, "AllOrderScreen">;

type Props = {
  navigation: AppNavigationProp;
  route: AppRouteProp;
};
//*** navigation&route ***

export default function AllOrderScreen({ navigation, route }: Props) {
    const { data, isLoading } = useGetAllOrdersQuery("");
    
    return (
        <View style={styles.container}>
          <View style={styles.titleRow}>
            <BackBtn1 onPress={() => navigation.navigate("ProfileScreen")} />
            <Text style={styles.titletxt}>
              All Orders ({!isLoading && data.result.length} items)
            </Text>
          </View>
    
          {isLoading && <MainLoader />}
    
          {!isLoading && (
            <FlatList
              data={data.result}
              keyExtractor={(item) => item.orderHeaderId}
              renderItem={({ item }) => (
                <OrderList key={item.orderHeaderId} orderData={item} isLoading={isLoading} />
              )}
            />
          )}
        </View>
      );
}