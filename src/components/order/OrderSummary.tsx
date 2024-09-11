import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../common";

type MenuItem = {
  name: string;
  price: number;
  quantity: number;
};

export default function OrderSummary() {
  const menuItems: MenuItem[] = [
    { name: "Spring Roll", price: 7.99, quantity: 36 },
    { name: "Idli", price: 8.99, quantity: 20 },
  ];

  const totalPrice = menuItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>

      <View style={styles.section}>
        <Text style={styles.label}>
          Name: <Text style={styles.value}>user</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>user@email.com</Text>
        </Text>
        <Text style={styles.label}>
          Phone: <Text style={styles.value}>11111</Text>
        </Text>
      </View>

      <Text style={styles.header}>Menu Items</Text>
      {menuItems.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      ))}

      <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#176c45",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontWeight: "bold",
  },
  menuItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  total: {
    alignSelf: "flex-end",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    color: "red",
    paddingHorizontal: 20,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
  },
});
