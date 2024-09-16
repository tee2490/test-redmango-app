import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useGetAllOrdersQuery } from '../../redux/apis/orderApi';
import styles from './MyOrderScreen.style';
import { BackBtn1 } from '../../ui';

import { RootStackParamList } from '../../navigates/typeRootStack';
import { MainLoader } from '../../common';
import { OrderList } from '../../components/order';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export default function AllOrderScreen() {
    const { data, isLoading } = useGetAllOrdersQuery("");
    const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()
    
    return (
        <View style={styles.container}>
          <View style={styles.titleRow}>
            <BackBtn1 onPress={() => navigate("ProfileScreen")} />
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