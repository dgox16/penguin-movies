import { useViewMovie } from "../hooks/shoppingCart/useViewMovie.js";
import { useShoppingCartStore } from "../store/shoppingCart";

export const ViewMovie = () => {
    const { movie, alreadyInSc, loading } = useViewMovie();
    const { shoppingCart, setShoppingCart } = useShoppingCartStore();

    const addToShoppingCart = (movie) => {
        const newMovies = shoppingCart.movies.concat({ movie: movie, quantity: 1 });
        setShoppingCart({ ...shoppingCart, movies: newMovies });
    };

    const handleSubmit = () => {
        addToShoppingCart(movie);
    };

    return (
        <>
            {loading ? (
                <p>Loading</p>
            ) : (
                <div className="container px-5 py-24 mx-auto bg-gray-800 mt-5">
                    <div className="lg:w-3/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                            style={{ height: "600px" }}
                            src={movie.image.url}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-24">
                            <h1 className="text-white text-3xl title-font font-medium mb-1">
                                {movie.title}
                            </h1>
                            <h2 className="text-white text-2xl title-font font-medium mb-1">
                                {movie.year}
                            </h2>
                            <p className="leading-relaxed">
                                Fam locavore kickstarter distillery. Mixtape chillwave
                                tumeric sriracha taximy chia microdosing tilde DIY. XOXO
                                fam indxgo juiceramps cornhole raw denim forage brooklyn.
                                Everyday carry +1 seitan poutine tumeric. Gastropub blue
                                bottle austin listicle pour-over, neutra jean shorts
                                keytar banjo tattooed umami cardigan.
                            </p>
                            <div className="flex mt-3">
                                <span className="title-font font-medium text-2xl">
                                    ${movie.price}
                                </span>
                                {movie.stock > 0 ? (
                                    alreadyInSc ? (
                                        <button
                                            type="button"
                                            className="flex ml-auto text-white bg-slate-500 border-0 py-2 px-6 focus:outline-none hover:bg-slate-600 rounded"
                                        >
                                            Already in shopping cart
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                                            onClick={handleSubmit}
                                        >
                                            Add
                                        </button>
                                    )
                                ) : (
                                    <button
                                        type="button"
                                        className="flex ml-auto text-white bg-slate-500 border-0 py-2 px-6 focus:outline-none hover:bg-slate-600 rounded"
                                    >
                                        Not stock
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
