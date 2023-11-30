import { useState } from "react";
import { FormNewMovie } from "./FormNewMovie";

export const SectionNewMovie = () => {
    const [bNewMovie, setBNewMovie] = useState(false);

    return (
        <div className="mt-6">
            {bNewMovie ? (
                <button
                    type="button"
                    className="mb-9 text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-stale-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stale-600 dark:hover:bg-stale-700 dark:focus:ring-stale-800"
                    onClick={() => setBNewMovie(!bNewMovie)}
                >
                    Cancel
                </button>
            ) : (
                <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => setBNewMovie(!bNewMovie)}
                >
                    Add another movie
                </button>
            )}
            {bNewMovie && <FormNewMovie />}
        </div>
    );
};
