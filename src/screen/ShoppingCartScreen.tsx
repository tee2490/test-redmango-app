import { View } from "react-native";
import React, { useState } from "react";
import { CartPickUpDetails, CartSummary } from "../components/cart";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { COLORS, SIZES } from "../common";
import { FormButton1 } from "../ui";

export default function ShoppingCartScreen() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {/* ใส่ครอบ GestureHandlerRootView เพื่อให้เลื่อน Scroll+SwipeList ได้ */}
      <GestureHandlerRootView>
        <View style={{ flex: 1 }}>
          <View style={{ height: 50 }}>
            <FormButton1
              color={visible ? COLORS.primary : COLORS.danger}
              isValid={true}
              title={visible ? "CartSummary >>>" : "<<< CartPickUpDetails"}
              onPress={() => setVisible(!visible)}
            />
          </View>
          <View
            style={{
              flex: 1,
              padding: SIZES.xSmall - 2,
              backgroundColor: "#24B0AC",
              borderRadius: SIZES.xSmall,
            }}
          >
            {visible ? <CartSummary /> : <CartPickUpDetails />}
          </View>
        </View>
      </GestureHandlerRootView>
    </>
  );
}
