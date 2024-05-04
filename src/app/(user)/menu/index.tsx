import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

import { Text, View } from "../../../components/Themed";
import Colors from "@/src/constants/Colors";
import ProductListItem from "@/src/components/ProductListItem";

import { useProductList } from "@/src/api/products";

export default function MenuScreen() {
  const { error, data: product, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Faild to fetch product</Text>;
  }

  return (
    <FlatList
      data={product}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
