import { useAuth } from "@/src/Providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminOrderList({ archeived = false }) {
  const statuses = archeived ? ["Delivered"] : ["Cooking", "New", "Delivering"];
  return useQuery({
    queryKey: ["orders", { archeived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses);
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return data;
    },
  });
}

export function useMyOrderList() {
  const { session } = useAuth();
  const id = session?.user.id;
  if (!id) return null;
  return useQuery({
    queryKey: ["orders", { user_id: id }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id);
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return data;
    },
  });
}

export function useOrderDetails(id: number) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
}

export const useInsertOrder = () => {
  const queryClient = useQueryClient();

  const { session } = useAuth();
  const userId = session?.user.id;
  return useMutation({
    async mutationFn(data: InsertTables["orders"]) {
      const { data: newProduct, error } = await supabase
        .from("order")
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["product"]);
    },
  });
};
