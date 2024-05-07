import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
// import orders from "@/src/data/orders";
import OrderListItem from "@/src/components/OrderListItems";
import { useAdminOrderList } from "@/src/api/orders";

const Orders = () => {
  const {
    data: orders,
    error,
    isLoading,
  } = useAdminOrderList({ archeived: false });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error Feching Data</Text>;
  }

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
