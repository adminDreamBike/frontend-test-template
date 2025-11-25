import { Game } from "@/utils/endpoint";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GamesActions {
  setGames: (games: Game[]) => void;
  addGame: (game: Game) => void;
  getGameById: (id: number) => unknown;
  removeGame: (id: number) => Game[] | unknown;
  clearGames: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAvailableFilters: (filters: string[]) => void;
  setCurrentFilter: (filter: string) => void;
  setCurrentPage: (currentPage: number) => void;
  increaseCurrentPage: () => void; 
}

interface GamesStates {
  games: Game[];
  isLoading: boolean;
  error: string | null;
  filters: string[];
  currentFilter: string;
  currentPage: number;
}

type GamesStore = GamesActions & GamesStates;

const useGamesStore = create<GamesStore>()(
  devtools(
    persist(
      (set, get) => ({
        games: [],
        isLoading: false,
        error: null,
        filters: [],
        currentFilter: "",
        currentPage: 0,
        setGames: (games: Game[]) => set({ games, error: null }, false),
        addGame: (game: Game) =>
          set(
            (state) => ({ games: [...state.games, game], error: null }),
            false
          ),
        getGameById: (id: number) => {
          return get().games.find((game) => Number(game.id) === id);
        },
        removeGame: (id: number) =>
          set((state) => {
            return {
              games: state.games.filter((game) => Number(game.id) !== id),
              error: null,
            };
          }, false),
        clearGames: () => set({ games: [], error: null }, false),
        setLoading: (isLoading) => set({ isLoading }, false),
        setError: (error) => set({ error, isLoading: false }, false),
        setAvailableFilters: (filters) => set({ filters: filters }),
        setCurrentFilter: (filter) => set({ currentFilter: filter }),
        setCurrentPage: (currentPage: number) => set({ currentPage }),
        increaseCurrentPage: () => {
            set((state) => {
                return {
                    currentPage: state.currentPage + 1
                }
            })
        }
      }),
      {
        name: "games-storage",
        partialize: (state) => ({ games: state.games }),
      }
    )
  )
);

export const gameSelectors = {
  selectAllGames: (state: GamesStore) => state.games,
  selectGameById: (id: number) => (state: GamesStore) =>
    state.games.find((game) => Number(game.id) === id),
  isLoading: (state: GamesStore) => state.isLoading,
  selectError: (state: GamesStore) => state.error,
  selectFilters: (state: GamesStore) => state.filters,
  selectCurrentFilter: (state: GamesStore) => state.currentFilter,
};

export default useGamesStore;
