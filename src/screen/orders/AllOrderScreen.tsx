import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../redux/apis/orderApi";
import styles from "./MyOrderScreen.style";
import { BackBtn1, FormButton1, FormInput } from "../../ui";

import { RootStackParamList } from "../../navigates/typeRootStack";
import { COLORS, MainLoader } from "../../common";
import { OrderList } from "../../components/order";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SD_Status } from "../../common/SD";
import RNPickerSelect from "react-native-picker-select";
import colors from "../../utils/colors";
import { orderHeaderModel } from "../../interfaces";

const filterOptions = [
  { label: "All", value: " " },
  { label: SD_Status.CONFIRMED, value: SD_Status.CONFIRMED },
  { label: SD_Status.BEING_COOKED, value: SD_Status.BEING_COOKED },
  { label: SD_Status.READY_FOR_PICKUP, value: SD_Status.READY_FOR_PICKUP },
  { label: SD_Status.CANCELLED, value: SD_Status.CANCELLED },
];

export default function AllOrderScreen() {
  const [orderData, setOrderData] = useState<orderHeaderModel[]>([]);
  const { data, isLoading } = useGetAllOrdersQuery("");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [filters, setFilters] = useState({ searchString: "", status: "" });

  const handleChange = (name: string) => (text: string) => {
    setFilters({ ...filters, [name]: text });
    console.log(filters);
  };

  const handleFilters = () => {
    const tempData = data.result.filter((orderData: orderHeaderModel) => {
      if (
        (orderData.pickupName &&
          orderData.pickupName.includes(filters.searchString)) ||
        (orderData.pickupEmail &&
          orderData.pickupEmail.includes(filters.searchString)) ||
        (orderData.pickupPhoneNumber &&
          orderData.pickupPhoneNumber.includes(filters.searchString))
      ) {
        return orderData;
      }
    });
    
    const finalArray = tempData.filter((orderData: orderHeaderModel) =>
      filters.status !== " " ? orderData.status === filters.status : orderData
    );
    setOrderData(finalArray);
  };
  
  useEffect(() => {
    if (data) {
      setOrderData(data.result);
    }
  }, [data]);

  const FilterOrder = (
    <View style={filterStyles.filterContainer}>
      <View style={filterStyles.filterContainer1}>
        <FormInput
          placeholder="Search name email or phone"
          value={filters.searchString}
          onChangeText={handleChange("searchString")}
        />
      </View>
      <View style={filterStyles.filterContainer1}>
        <RNPickerSelect
          style={{
            inputAndroid: filterStyles.inputAndroid,
            viewContainer: filterStyles.pickerContainer,
          }}
          value={filters.status}
          onValueChange={handleChange("status")}
          items={filterOptions}
          placeholder={{ label: "Status Select...", value: null }}
        />
      </View>
      <View
        style={{
          marginTop: -12,
          borderRadius: 2,
        }}
      >
        <FormButton1
          height={40}
          title="filter"
          isValid={true}
          color={COLORS.info}
          onPress={()=>handleFilters()}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <BackBtn1 onPress={() => navigate("ProfileScreen")} />
        <Text style={styles.titletxt}>
          All Orders ({!isLoading && data.result.length} items)
        </Text>
      </View>

      {isLoading && <MainLoader />}

      {FilterOrder}

      {!isLoading && (
        <FlatList
          data={orderData}
          // keyExtractor={(item) => item.orderHeaderId}
          renderItem={({ item }) => (
            <OrderList
              //key={item.orderHeaderId}
              orderData={item}
              isLoading={isLoading}
            />
          )}
        />
      )}
    </View>
  );
}

const filterStyles = StyleSheet.create({
  inputAndroid: {
    color: COLORS.primary,
    marginHorizontal: -10,
    marginVertical: -5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterContainer1: {
    paddingHorizontal: 2,
    flex: 1,
    borderRadius: 5,
  },
});
