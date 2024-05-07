import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Tables } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { router } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";

type Product = Tables<"product">;

type ChartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<ChartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const ChartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const addItem = (product: Product, size: CartItem["size"]) => {
    // If already in char increase quantity

    const existing = items.find(
      (item) => item.product == product && item.size == size
    );

    if (existing) {
      updateQuantity(existing.id, +1);
    }

    const newCartItem: CartItem = {
      id: randomUUID(), //Auto generate
      product,
      product_id: product.id,
      quantity: 1,
      size,
    };

    setItems([newCartItem, ...items]);
  };

  // Update quantity

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items.map((item) =>
      item.id !== itemId ? item : { ...item, quantity: item.quantity + amount }
    );
    setItems(updatedItems.filter((item) => item.quantity > 0));
  };
  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  const checkout = () => {
    insertOrder({ total }, { onSuccess: saveOrderItems });
  };
  const clearcart = () => {
    setItems([]);
  };
  const saveOrderItems = (data: Tables<"orders">) => {
    console.log(data)
    const item1 = items[0];

    insertOrderItems(
      {
        order_id: orders.id,
        product_id: item1.product_id,
        quantitu: item1.quantity,
        size: item1.size,
      },
      {
        onSuccess: () => {
          clearcart();
          router.push(`/(user)/orders/${data.id}`);
        },
      }
    );
  };
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default ChartProvider;
export const useCart = () => useContext(CartContext);
