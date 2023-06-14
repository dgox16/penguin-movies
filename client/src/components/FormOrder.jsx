import { useForm } from "react-hook-form";
import { useMovies } from "../context/MoviesContext";

export const FormOrder = () => {
    const { addMovie } = useMovies();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit((values) => {
        addMovie(values);
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="mb-6">
                    <label
                        for="email"
                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                    >
                        The title:
                    </label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title"
                    />
                    {errors.title && <p className="text-red-500">Title is required</p>}
                </div>
                <div className="mb-6">
                    <label
                        for="email"
                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                    >
                        The year:
                    </label>
                    <input
                        type="number"
                        {...register("year", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Year"
                    />
                    {errors.year && <p className="text-red-500">Year is required</p>}
                </div>
                <div className="mb-6">
                    <label
                        for="email"
                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                    >
                        The Price:
                    </label>
                    <input
                        type="number"
                        {...register("price", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Price"
                    />
                    {errors.price && <p className="text-red-500">Price is required</p>}
                </div>
                <div className="mb-6">
                    <label
                        for="email"
                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                    >
                        The Image:
                    </label>
                    <input
                        type="file"
                        {...register("image", { required: true })}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        placeholder="Image"
                    />
                    {errors.image && <p className="text-red-500">ERRORS</p>}
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add
                </button>
            </form>
        </div>
    );
};
