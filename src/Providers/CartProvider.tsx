import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type ChartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

const CartContext = createContext<ChartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const ChartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

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
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default ChartProvider;
export const useCart = () => useContext(CartContext);
