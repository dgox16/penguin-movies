import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePurchasesStore = create(
    persist(
        (set) => ({
            purchases: [],
            loading: true,
            setPurchases: (purchases) => set(() => ({ purchases })),
            setLoading: (loading) => set(() => ({ loading })),
            resetPurchases: () => set({ purchases: [], loading: true }),
        }),
        { name: "purchases" },
    ),
);
