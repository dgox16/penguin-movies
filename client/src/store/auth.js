import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            token: "",
            user: null,
            isAuthenticated: false,
            errors: [],
            loading: true,
            setLoading: (loading) => set(() => ({ loading })),
            setToken: (token) => set(() => ({ token, isAuthenticated: true })),
            setUser: (user) => set(() => ({ user })),
            logout: () =>
                set(() => ({
                    token: "",
                    user: null,
                    isAuthenticated: false,
                })),
            setErrors: (e) => set(() => ({ errors: e })),
        }),
        { name: "auth" },
    ),
);
