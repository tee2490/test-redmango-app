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
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [orderData, setOrderData] = useState<orderHeaderModel[]>([]);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [filters, setFilters] = useState({ searchString: "", status: "" });

  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });

  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
    }),
  });

  const handleChange = (name: string) => (text: string) => {
    setFilters({ ...filters, [name]: text });
    console.log(filters);
  };

  const handleFilters = () => {
    //เมื่อสเตทเปลี่ยนจะไปเรียก useGetAllOrdersQuery()
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
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
          onPress={() => handleFilters()}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <BackBtn1 onPress={() => navigate("ProfileScreen")} />
        <Text style={styles.titletxt}>
          All Orders ({!isLoading && totalRecords} items)
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
