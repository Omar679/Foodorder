import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Stack } from "expo-router";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(auth)/"} asChild>
        <Button text="Authentication" />
      </Link>
      <Link href={"/(user)/menu/"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)/menu/"} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  );
};

export default index;
