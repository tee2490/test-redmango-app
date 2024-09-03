import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../common";

const styles = StyleSheet.create({
  container: {
    padding: SIZES.xSmall-5,
    backgroundColor: COLORS.lightWhite,
    borderRadius:5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  summary: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default styles;
