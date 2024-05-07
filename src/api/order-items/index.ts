import { useAuth } from "@/src/Providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: InsertTables<"order_items">[]) {
      const { data: newProduct, error } = await supabase
        .from("order_items")
        .insert({ ...data })
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
