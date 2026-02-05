import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  firstName: string;
  lastName: string;
};

type Action = {
  updateFirstName: (val: State["firstName"]) => void;
  updateLastName: (val: State["lastName"]) => void;
};

const useName = create<State & Action>()(
  immer(
    persist(
      (set) => ({
        firstName: "",
        lastName: "",
        updateFirstName: (val) =>
          set({
            firstName: val,
          }),
        updateLastName: (val) =>
          set({
            lastName: val,
          }),
      }),
      {
        name: "name-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useName;
