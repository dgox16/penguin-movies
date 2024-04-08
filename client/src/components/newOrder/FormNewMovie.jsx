import { useForm } from "react-hook-form";
import { useMoviesStore } from "../../store/movies";
import { newMovieOrderRequest } from "../../services/moviesRequest";

import { Slider, Button, Input, Spacer, Textarea } from "@nextui-org/react";
import { useState } from "react";

export const FormNewMovie = () => {
    const { setMovies, movies } = useMoviesStore();
    const [isUploading, setIsUploading] = useState(false);
    const [ratingSlider, setRatingSlider] = useState(2.5);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const addMovie = async (values) => {
        setIsUploading(true);
        const res = await newMovieOrderRequest(values);
        setMovies([...movies, res]);
        setIsUploading(false);
    };

    const onSubmit = handleSubmit((values) => {
        addMovie(values);
    });
    const handleSliderChange = (newValue) => {
        setRatingSlider(newValue);
        setValue("rating", newValue);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Input
                    {...register("title", {
                        required: "This is required",
                    })}
                    type="text"
                    variant="bordered"
                    size="lg"
                    className="font-semibold"
                    label="TITLE:"
                    labelPlacement={"outside"}
                    placeholder="Enter the title for the movie"
                    isInvalid={errors.title ? true : false}
                    errorMessage={errors.title?.message}
                />
                <Spacer y={6} />
                <Textarea
                    {...register("description", {
                        required: "This is required",
                    })}
                    label="DESCRIPTION:"
                    variant="bordered"
                    className="font-semibold"
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    isInvalid={errors.description ? true : false}
                    errorMessage={errors.description?.message}
                />
                <Spacer y={6} />
                <Slider
                    size="lg"
                    step={0.5}
                    color="warning"
                    label="RATING:"
                    maxValue={5}
                    minValue={1}
                    onChange={handleSliderChange}
                    defaultValue={2.5}
                    className="max-w-md font-semibold"
                />
                <Spacer y={6} />
                <input
                    type="hidden"
                    name="rating"
                    defaultValue={ratingSlider}
                    {...register("rating")}
                />
                <Input
                    {...register("year", {
                        required: "This is required",
                    })}
                    type="number"
                    variant="bordered"
                    size="lg"
                    className="font-semibold"
                    label="RELEASE YEAR:"
                    labelPlacement={"outside"}
                    placeholder="Enter the release year"
                    isInvalid={errors.year ? true : false}
                    errorMessage={errors.year?.message}
                />
                <Spacer y={6} />
                <Input
                    {...register("price", {
                        required: "This is required",
                    })}
                    type="number"
                    variant="bordered"
                    size="lg"
                    className="font-semibold"
                    label="PRICE ($):"
                    labelPlacement={"outside"}
                    placeholder="Enter the price of the movie"
                    isInvalid={errors.price ? true : false}
                    errorMessage={errors.price?.message}
                />
                <Spacer y={6} />
                <Input
                    {...register("image", {
                        required: "This is required",
                    })}
                    type="file"
                    size="lg"
                    className="font-semibold"
                    label="MOVIE POSTER:"
                    labelPlacement={"outside"}
                    placeholder="Add the movie poster"
                    isInvalid={errors.image ? true : false}
                    errorMessage={errors.image?.message}
                />

                <div className="flex justify-end mt-5">
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full sm:w-auto"
                        isLoading={isUploading}
                    >
                        {isUploading ? "Loading" : "Add Movie"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
