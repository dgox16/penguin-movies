import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrdersStore = create(
    persist(
        (set) => ({
            orders: [],
            loading: true,
            setOrders: (orders) => set(() => ({ orders })),
            setLoading: (loading) => set(() => ({ loading })),
            resetOrders: () => set({ orders: [], loading: true }),
        }),
        { name: "orders" },
    ),
);
