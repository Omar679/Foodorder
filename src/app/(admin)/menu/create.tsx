import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  <Stack.Screen options={{ title: "Create Product" }} />;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();

  const isUpdating = !!id;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetFields = () => (setName(""), setPrice(""));

  const validateInput = () => {
    if (!name) {
      setError("Name is Required");
      return false;
    }
    if (!price) {
      setError("Price is requred");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Price is not a number");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onUpdate = () => {
    setError("");
    if (!validateInput()) {
      return;
    }

    console.warn("Updating Product", name, "Price", price);
    resetFields();
  };

  const onCreate = () => {
    setError("");
    if (!validateInput()) {
      return;
    }

    console.warn("Creating Product", name, "Price", price);
    resetFields();
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete the product", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };
  const onDelete = () => {};

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: isUpdating ? "Update Product" : "Create Product",
        }}
      />
      <Image
        source={{ uri: image ? image : defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.selectImage}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.selectImage}>
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 10 },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: { color: "grey", fontSize: 16 },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  selectImage: {
    alignSelf: "center",
    fontWeight: "500",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});