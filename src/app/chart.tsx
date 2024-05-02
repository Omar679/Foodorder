import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "../Providers/CartProvider";
import { CartItem, Product } from "../types";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

const chart = () => {
  const { items,total } = useCart();

  return (
    <View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <FlatList
        contentContainerStyle={{ padding: 10, gap: 10 }}
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />
      <Text>Total ${total}</Text>
      <Button text="Checkout" />
    </View>
  );
};

export default chart;

const styles = StyleSheet.create({});
