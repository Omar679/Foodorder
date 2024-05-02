import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/src/components/OrderListItems";
import orders from "@/src/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";

const OrderDetails = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((o) => o.id.toString() == id);

  if (!order) {
    return <Text>Not Found</Text>;
  }

  const item = orders.find((i) => i.id);

  if (!item) return <Text>Order not found</Text>;

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => (
          <View>
            <OrderItemListItem item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
