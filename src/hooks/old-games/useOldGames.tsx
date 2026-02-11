import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Game } from "../../components/ui/games-pagination/game";
import type { FetchGames } from "./oldGamesTypes";

type State = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  isLoading?: boolean;
  error?: unknown;
  items: Game[];
};

type Actions = {
  getPageItems: (currentPage: number, limit: number) => void;
  pageChange: (nextPage: number) => void;
};

const ITEMS_PER_PAGE = 4;
const API_BASE_URL = "https://v2.api.noroff.dev/old-games";

const useOldGames = create<State & Actions>()(
  immer(
    persist(
      (set, get) => ({
        currentPage: 1,
        itemsPerPage: ITEMS_PER_PAGE,
        totalItems: 0,
        totalPages: 0,
        items: [],
        isLoading: true,
        error: null,
        getPageItems: async (currentPage = 1, limit = ITEMS_PER_PAGE) => {
          set({ isLoading: true, error: null });
          try {
            const { data, totalItems, totalPages } =
              await fetchGames(currentPage);

            set({
              isLoading: false,
              totalItems: totalItems,
              totalPages: totalPages,
              items: data,
            });
          } catch (error) {
            set({ error: error?.message, isLoading: false });
          }
        },
        pageChange: async (nextPage) => {
          if (nextPage >= 1 && nextPage <= get().totalPages) {
            set({ isLoading: true });

            const { data } = await fetchGames(nextPage);
            set({
              currentPage: nextPage,
              items: data,
              isLoading: false,
            });
          }
        },
      }),
      {
        name: "old-games-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useOldGames;

async function fetchGames(
  currentPage = 1,
  limit = ITEMS_PER_PAGE,
): Promise<FetchGames> {
  try {
    const response = await fetch(
      `${API_BASE_URL}?page=${currentPage}&limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data, meta } = await response.json();

    const totalItems = meta.totalCount;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      meta,
      totalItems,
      itemsPerPage: limit,
      totalPages,
    };
  } catch (error) {
    return error;
  }
}
