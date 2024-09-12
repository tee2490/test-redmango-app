import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigates/typeRootStack';
import { RouteProp } from '@react-navigation/native';

//*** navigation&route ประกาศคุณสมบัติเส้นทางและการเรียกใช้พารามิเตอร์ที่ส่งมา
type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OrderConfirmed"
>;

type AppRouteProp = RouteProp<
  RootStackParamList,
  "OrderConfirmed"
>;

type Props = {
  navigation: AppNavigationProp;
  route: AppRouteProp;
};
//*** navigation&route ***

export default function OrderConfirmed({navigation,route} : Props) {
  const {id} = route.params;  
  return (
    <View>
      <Text>OrderConfirmed {id}</Text>
    </View>
  )
}