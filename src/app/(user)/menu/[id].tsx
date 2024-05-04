import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { products } from "../../../data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/Button";
import { useCart } from "@/src/Providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { useProduct } from "@/src/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetails = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);


  const [activeSize, setActiveSize] = useState<PizzaSize>("S");
  const { addItem } = useCart();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Faild to fetch product</Text>;
  }

  const addToChart = () => {
    addItem(product, activeSize);
    router.push("/chart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text>Select Size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setActiveSize(size)}
            style={[
              styles.size,
              { backgroundColor: activeSize == size ? "gainsboro" : "white" },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: activeSize == size ? "black" : "gainsboro" },
              ]}
              key={size}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to Chart" onPress={addToChart} />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
  image: { width: "100%", aspectRatio: 1 },
  price: { fontSize: 18, fontWeight: "bold", marginTop: "auto" },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: { fontSize: 20, fontWeight: "500" },
});
