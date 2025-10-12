import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            errors: [],
            loading: true,
            setLoading: (loading) => set(() => ({ loading })),
            setUser: (user) => set(() => ({ user, isAuthenticated: true })),
            logout: () =>
                set(() => ({
                    user: null,
                    isAuthenticated: false,
                })),
            setErrors: (e) => set(() => ({ errors: e })),
        }),
        { name: "auth" },
    ),
);
