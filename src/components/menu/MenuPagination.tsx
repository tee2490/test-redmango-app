import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SD_PerPage } from "../../common/SD";
import RNPickerSelect from "react-native-picker-select";
import { COLORS, SIZES } from "../../common";

import colors from "../../utils/colors";
import { DataTable } from "react-native-paper";

const SortTypes = [
  { label: SD_PerPage.PERPAGE0, value: SD_PerPage.PERPAGE0 },
  { label: SD_PerPage.PERPAGE1, value: SD_PerPage.PERPAGE1 },
  { label: SD_PerPage.PERPAGE2, value: SD_PerPage.PERPAGE2 },
  { label: SD_PerPage.PERPAGE3, value: SD_PerPage.PERPAGE3 },
  { label: SD_PerPage.PERPAGE4, value: SD_PerPage.PERPAGE4 },
];

// const items = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
// ];

interface Props {
  TotalRecords: number;
  onSetPagination(pageSize: number, pageNumber: number): void;
}

export default function Paginations({ TotalRecords, onSetPagination }: Props) {
  const [page, setPage] = useState(0); //หมายเลขหน้าปัจจุบัน
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    parseInt(SD_PerPage.PERPAGE0)
  ); //จำนวนแถวต่อหน้า
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, TotalRecords);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const handleChange = (text: number) => {
    onItemsPerPageChange(text);
  };

  useEffect(() => {
    //page+1 เนื่องจาก backend ตั้งค่าหน้าแรกเท่ากับ 1
    onSetPagination(page + 1, numberOfItemsPerPage);
  }, [page, numberOfItemsPerPage]);

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <RNPickerSelect
          style={{
            inputAndroid: styles.inputAndroid,
            viewContainer: styles.pickerContainer,
          }}
          onValueChange={(value) => handleChange(value)}
          items={SortTypes}
          placeholder={{ label: "Rows Per Page...", value: null }}
        />
      </View>
      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(TotalRecords / numberOfItemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${TotalRecords}`}
            showFastPaginationControls
            numberOfItemsPerPage={numberOfItemsPerPage}
          />
        </DataTable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: SIZES.small / 2,
    // backgroundColor: COLORS.primary,
    alignContent: "center",
    paddingBottom: -10,
  },
  inputAndroid: {
    color: COLORS.primary,
    marginHorizontal: -10,
    marginVertical: -5,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    height: 50,
    marginBottom: 12,
  },
  selectContainer: {
    height: 55,
    flex: 0.3,
    margin: SIZES.xSmall,
  },
  tableContainer: {
    flex: 0.7,
    marginTop: 3,
  },
});
