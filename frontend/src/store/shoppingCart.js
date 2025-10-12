import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useShoppingCartStore = create(
    persist(
        (set) => ({
            shoppingCart: [],
            loading: true,
            setShoppingCart: (shoppingCart) => set(() => ({ shoppingCart })),
            setLoading: (loading) => set(() => ({ loading })),
            resetShoppingCart: () => set({ shoppingCart: [], loading: true }),
        }),
        { name: "shoppingCart" },
    ),
);
