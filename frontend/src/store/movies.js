import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMoviesStore = create(
    persist(
        (set) => ({
            movies: [],
            loading: true,
            setMovies: (movies) => set(() => ({ movies })),
            setLoading: (loading) => set(() => ({ loading })),
        }),
        { name: "movies" },
    ),
);
