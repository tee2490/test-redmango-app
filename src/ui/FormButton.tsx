import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../common";

const Button = ({ title, onPress, isValid, loader } : any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(!isValid ?  COLORS.gray: COLORS.primary)}
    >
      {!loader  ? (
        <Text style={styles.btnTxt}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  btnStyle: (backgroundColor:string) => ({
    height: 40,
    width: "100%",
    marginVertical: 8,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }),
});
