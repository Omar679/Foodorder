import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/src/components/OrderListItems";
import orders from "@/src/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useOrderDetails } from "@/src/api/orders";

const OrderDetails = () => {
  const { id: IdString } = useLocalSearchParams();
  const id = parseFloat(typeof IdString == "string" ? IdString : IdString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);

  if (error) {
    return <Text>Order not Found</Text>;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

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
