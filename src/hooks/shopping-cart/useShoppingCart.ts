import { create } from "zustand";
import type { Product, ProductWithQuantity } from "../../types";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  isOpen: boolean;
  items: ProductWithQuantity[];
  sumAmount: number;
  totalAmount: number;
  itemCount: number;
};

type Actions = {
  toggleCartVisibilty: () => void;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  updateQuantity: (item: Product, quantity: number) => void;
  resetCart: () => void;
};

const useShoppingCart = create<State & Actions>()(
  immer(
    persist(
      (set, get) => ({
        isOpen: false,
        items: [],
        sumAmount: 0,
        totalAmount: 0,
        itemCount: 0,
        toggleCartVisibilty: () =>
          set(() => {
            return {};
          }),
        addItem: (product) =>
          set(() => {
            const existingItem = get().items.find(
              (item) => item.id === product.id,
            );

            if (existingItem) {
              const updatedItems = get().items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              );

              return {
                items: updatedItems,
                itemCount: updatedItems.reduce(
                  (count, item) => count + item.quantity,
                  0,
                ),
                sumAmount: calculateTotal(updatedItems),
                totalAmount: calculateTotal(updatedItems),
              };
            }

            const updatedItems = [...get().items, { ...product, quantity: 1 }];

            return {
              items: updatedItems,
              itemCount: updatedItems.reduce(
                (count, item) => count + item.quantity,
                0,
              ),
              sumAmount: calculateTotal(updatedItems),
              totalAmount: calculateTotal(updatedItems),
            };
          }),
        removeItem: (product) =>
          set(() => {
            const updatedItems = get().items.filter(
              (item) => item.id !== product.id,
            );

            return {
              items: updatedItems,
              itemCount: updatedItems.reduce(
                (count, item) => count + item.quantity,
                0,
              ),
              sumAmount: calculateTotal(updatedItems),
              totalAmount: calculateTotal(updatedItems),
            };
          }),
        updateQuantity: (product, shiftVal) =>
          set(() => {
            const existingItem = get().items.find(
              (item) => item.id === product.id,
            );

            if (existingItem) {
              const updatedItems = get().items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + shiftVal }
                  : item,
              );

              return {
                items: updatedItems,
                itemCount: updatedItems.reduce(
                  (count, item) => count + item.quantity,
                  0,
                ),
                sumAmount: calculateTotal(updatedItems),
                totalAmount: calculateTotal(updatedItems),
              };
            }
          }),
        resetCart: () =>
          set(() => {
            return {
              items: [],
              sumAmount: 0,
              totalAmount: 0,
              itemCount: 0,
            };
          }),
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useShoppingCart;

function calculateTotal(items: ProductWithQuantity[] = []) {
  const total = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return Number(total.toFixed(2));
}
