import axios from "./axios";

export const getAllMoviesRequest = async () => {
    const res = await axios.get("/movies");
    const newData = res.data.map((movie) => ({
        ...movie,
        image: {
            ...movie.image,
            url: movie.image.url.replace("/upload/", "/upload/w_300,h_430,q_20,f_avif/"),
        },
    }));
    return newData;
};

export const newMovieOrderRequest = async (values) => {
    const form = new FormData();

    form.append("image", values.image[0]);
    form.append("stock", 0);
    for (const key in values) {
        form.append(key, values[key]);
    }

    const res = await axios.post("/movies", form, {
        Headers: {
            "Context-Type": "multipart/form-data",
        },
    });
    return res.data;
};
