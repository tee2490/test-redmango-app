import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },

  image: {
    aspectRatio:1.2,
    resizeMode:"cover"
  },

  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },

  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },

  nameRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },

  name: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
  },

  categoryRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 10,
    top: 5,
  },

  category: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
    backgroundColor: COLORS.secondary,
    padding: 5,
    borderRadius: SIZES.large,
  },

  categoryText: {
    color: COLORS.gray,
    fontFamily: FONTS.medium,
    paddingHorizontal: SIZES.xSmall,
  },

  countRow: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
    backgroundColor: COLORS.secondary,
    padding: 5,
    borderRadius: SIZES.large,
  },

  countText: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize : SIZES.medium,
    paddingHorizontal: SIZES.xSmall,
  },

  descriptionWraper: {
    marginTop: SIZES.xLarge,
    marginHorizontal: SIZES.large,
  },

  description: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.large - 2,
  },

  descText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  
  price: {
    paddingHorizontal: 10,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
  },

  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },

  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width,
  },

  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },

  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
