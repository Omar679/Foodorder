import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import orders from "@/src/data/orders";
import OrderListItem from "@/src/components/OrderListItems";

const Orders = () => {
  return (
    <View>
      <FlatList
        contentContainerStyle={{ gap: 10, padding: 10 }}
        data={orders}
        renderItem={({ item }) => (
          <View>
            <OrderListItem order={item} key={item.id} />
          </View>
        )}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
