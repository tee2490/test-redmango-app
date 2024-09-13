import { StyleSheet } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../common";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: SIZES.width - 50,
    marginBottom: 12,
  },
  titletxt: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
    letterSpacing: 4,
    marginLeft: SIZES.small,
  },
  imageContainer: {
    width: 70,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  textTitleContainer: {
    flex: 1,
  },
  textDetailContainer: {
    flex: 1,
  },
  productTxt: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textTransform: "capitalize",
  },
  supplya: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    marginTop: 3,
    textTransform: "capitalize",
  },
  orders: {
    backgroundColor: COLORS.lightWhite,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  favContainer: (color: any) => ({
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.xSmall,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: color,
    ...SHADOWS.medium,
    shadowColor: COLORS.secondary,
  }),
});

export default styles;
