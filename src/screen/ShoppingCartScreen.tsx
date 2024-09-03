import { View } from "react-native";
import React from "react";
import { CartPickUpDetails, CartSummary } from "../components/cart";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { SIZES } from "../common";

export default function ShoppingCartScreen() {
  return (
    <>
    {/* ใส่ครอบ GestureHandlerRootView เพื่อให้เลื่อน Scroll+SwipeList ได้ */}
      <GestureHandlerRootView>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.5,padding: SIZES.xSmall-2, backgroundColor:'#24B0AC',borderRadius:SIZES.xSmall}}>
            <CartSummary />
          </View> 
          <View style={{ flex: 0.5,padding:SIZES.xSmall-2, backgroundColor:'#F98028',borderRadius:SIZES.xSmall}}>
            <CartPickUpDetails />
          </View>
        </View>
      </GestureHandlerRootView>
    </>
  );
}
