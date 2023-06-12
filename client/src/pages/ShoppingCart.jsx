import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";

export const ShoppingCart = () => {
    const { shoppingCart, deleteByShoppingCart, updateShoppingCart, buyShoppingCart } = useMovies();
    const navigate = useNavigate();

    const handleQ = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        const aux = shoppingCart.movies.map((movie) =>
            movie.movie._id === id ? { ...movie, quantity: parseInt(value) } : movie,
        );
        updateShoppingCart(aux);
    };

    const handleDelete = (event) => {
        const id = event.target.id;
        deleteByShoppingCart(id);
    };

    const handleSubmit = () => {
        buyShoppingCart();
        navigate("/");
    };

    return (
        <>
            {shoppingCart.movies.map((movie) => {
                return (
                    <div key={movie.movie._id}>
                        <p>{movie.movie.title}</p>
                        <input
                            type="number"
                            name="quantity"
                            id={movie.movie._id}
                            min="1"
                            className="text-black"
                            onChange={handleQ}
                        />
                        <button type="button" id={movie.movie._id} onClick={handleDelete}>
                            Eliminar
                        </button>
                    </div>
                );
            })}
            <button type="button" onClick={handleSubmit}>
                Add
            </button>
        </>
    );
};
