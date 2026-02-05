import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  count: number;
  codeName: {
    innerLayer: string;
  };
};

type Action = {
  increament: (newCount?: State["count"]) => void;
  decreament: () => void;
  setCount: (newCount?: State["count"]) => void;
};

const useCounter = create<State & Action>()(
  immer(
    persist(
      (set, get) => ({
        count: 0,
        codeName: {
          innerLayer: "foo",
        },
        increament: (newCount = 1) =>
          set(() => ({
            count: get().count + newCount,
          })),
        decreament: () =>
          set(() => ({
            count: get().count - 1,
          })),
        setCount: (newCount = 0) => set({ count: newCount }),
      }),
      {
        name: "counter-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useCounter;
