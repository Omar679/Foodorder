import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Link, Redirect, Stack } from "expo-router";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";

const Signin = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign In" }} />

      <Text style={styles.header}>Email</Text>
      <TextInput placeholder="jon@gmail.com" style={styles.input} />
      <Text style={styles.header}>Password</Text>
      <TextInput style={styles.input} secureTextEntry />
      <Button text="Sign in" />
      <Link href={"/(auth)/SignUp"} asChild>
        <Text style={styles.subtext}>Create an account</Text>
      </Link>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: { color: "gray", fontWeight: "500", fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
  },
  subtext: {
    alignSelf: "center",
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: 10,
  },
});
