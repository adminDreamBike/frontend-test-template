import { Game } from "@/utils/endpoint";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CartItem extends Game {
  quantity: number;
  addedAt: string;
}

interface cartState {
  items: CartItem[];
  isOpen: boolean;
}

interface cartActions {
  // Actions - Cart management
  addItem: (game: Game, quantity?: number) => void;
  removeItem: (gamedId: number) => void;
  updateQuantity: (gameId: number, quantity: number) => void;
  incrementQuantity: (gameId: number) => void;
  decrementQuantity: (gameId: number) => void;
  clearCart: () => void;

  // Actions - UI
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Getters (computed values)
  getItemCount: () => number;
  getTotalPrice: () => number;
  getItemById: (gameId: number) => unknown | undefined;
  hasItem: (gameId: number) => boolean;
}

type CartStore = cartState & cartActions;

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        items: [],
        isOpen: false,
        addItem: (game, quantity = 1) =>
          set(
            (state) => {
              const existingItem = state.items.find(
                (item) => item.id === game.id
              );

              if (existingItem) {
                return {
                  items: state.items.map((item) =>
                    item.id === game.id
                      ? { ...item, quantity: item.quantity + quantity }
                      : item
                  ),
                };
              }
              return {
                items: [
                  ...state.items,
                  {
                    ...game,
                    quantity,
                    addedAt: new Date().toISOString(),
                  },
                ],
              };
            },
            false,
            "addItem"
          ),
        removeItem: (gameId) =>
          set(
            (state) => {
                return {
                    items: state.items.filter((item) => Number(item.id) !== gameId),
            }},
            false,
            "removeItem"
          ),
          updateQuantity:   (gameId, quantity) => set((state) => {
            if (quantity <= 0) {
                return {
                    items: state.items.filter((item) => Number(item.id) !== gameId)
                }
            }
            return {
                items: state.items.map((item) => Number(item.id) === gameId ? { ...item, quantity } : item)
            }
          }, false, 'updateQuantity'),
          incrementQuantity: (gameId) => set((state) => ({ 
            items: state.items.map((item) =>Number(item.id) === gameId ? { ...item, quantity: item.quantity + 1 } : item),
          }), false, 'incrementQuantity'),
          decrementQuantity: (gameId) => set((state) => ({
            items: state.items.map((item) => Number(item.id) === gameId ? { ...item, quantity: item.quantity - 1} : item).filter((item) => item.quantity > 0)
          }), false, 'decrementQuantity'),
          clearCart: () => set({ items: [] }, false, 'clearCart'),
          toggleCart: () => set((state) => ({ isOpen: !state.isOpen }), false, "toggleCart"),
          openCart: () => set({ isOpen: true }, false, "openCart"),
          closeCart: () => set({ isOpen: false, }, false, 'closeCart'),
          getItemCount: () => {
            return get().items.reduce((total, item) => total + item.quantity, 0)
          },
          getTotalPrice: () => {
            return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
          },
          getItemById: (gameId) => {
            return get().items.find((item) => Number(item.id) === gameId)
          },
          hasItem: (gameId) => {
            return get().items.some((item) => Number(item.id) === gameId)
          },
      }),
      {
        name: "shopping-cart-storage",
        partialize: (state) => ({ items: state.items }), // only persist items
      }
    )
  )
);

export const cartSelectors = {
    selectItems: (state: CartStore) => state.items,
    selectIsOpen: (state: CartStore) => state.isOpen,
    selectItemCount: (state: CartStore) => state.getItemCount(),
    selectTotalPrice: (state: CartStore) => state.getTotalPrice(),
    selectItemById: (gameId: number) => (state: CartStore) => state.getItemById(gameId),
    selectHasItem: (gameId: number) => (state: CartStore) => state.hasItem(gameId),
    selectFormattedTotal: (state: CartStore) => `$${state.getTotalPrice().toFixed(2)}`,
    selectIsEmpty: (state: CartStore) => state.items.length === 0,
}


export default useCartStore