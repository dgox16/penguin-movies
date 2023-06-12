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
                <input
                    type="text"
                    {...register("title", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Title"
                />
                {errors.title && <p className="text-red-500">Title is required</p>}
                <input
                    type="number"
                    {...register("year", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Year"
                />
                {errors.year && <p className="text-red-500">Year is required</p>}
                <input
                    type="number"
                    {...register("price", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Price"
                />
                {errors.price && <p className="text-red-500">Price is required</p>}
                <input
                    type="file"
                    {...register("image", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Image"
                />
                {errors.image && <p className="text-red-500">ERRORS</p>}
                <button type="submit">Add</button>
            </form>
        </div>
    );
};
