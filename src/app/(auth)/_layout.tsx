import React from "react";
import { Link, Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "@/src/Providers/AuthProvider";

export default function AuthLayout() {
  const { session } = useAuth();
  if (session) {
    return <Redirect href={"/"} />;
  }
  return <Stack />;
}
