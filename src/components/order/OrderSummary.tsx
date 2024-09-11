import React from "react";
import { View, Text } from "react-native";
import { orderSummaryProps } from "./orderSummaryProps";
import { cartItemModel } from "../../interfaces";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./OrderSummary.style";

export default function OrderSummary({ data, userInput }: orderSummaryProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.header}>Order Summary</Text>

        <View style={styles.section}>
          <Text style={styles.label}>
            Name: <Text style={styles.value}>{userInput.name}</Text>
          </Text>
          <Text style={styles.label}>
            Email: <Text style={styles.value}>{userInput.email}</Text>
          </Text>
          <Text style={styles.label}>
            Phone: <Text style={styles.value}>{userInput.phoneNumber}</Text>
          </Text>
        </View>

        <Text style={styles.header}>Menu Items</Text>

        {data?.cartItems?.map((cartItem: cartItemModel, index: number) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{cartItem.menuItem?.name}</Text>
            <Text style={styles.itemPrice}>
              ${cartItem.menuItem?.price.toFixed(2)} x {cartItem.quantity} = $
              {(cartItem.menuItem?.price ?? 0 * cartItem.quantity! ?? 0).toFixed(2)}
            </Text>
          </View>
        ))}

        <Text style={styles.total}>Total: ${data?.cartTotal?.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

