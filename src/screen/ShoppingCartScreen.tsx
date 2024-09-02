import { View } from "react-native";
import React from "react";
import { CartSummary } from "../components/cart";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ShoppingCartScreen() {
  return (
    // ใส่ครอบ GestureHandlerRootView เพื่อให้เลื่อน Scroll+SwipeList ได้
    <GestureHandlerRootView>
      <CartSummary />
    </GestureHandlerRootView>
  );
}
