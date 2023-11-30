import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoviesInStock } from "../components/inventory/MoviesInStock";
import { Orders } from "../components/inventory/Orders";
import { Purchases } from "../components/inventory/Purchases";
import { useAuthStore } from "../store/auth";
import { useMoviesStore } from "../store/movies";
import { usePurchasesStore } from "../store/purchases";
import { useOrdersStore } from "../store/orders";

export const Inventory = () => {
    const { movies } = useMoviesStore();
    const { purchases } = usePurchasesStore();
    const { orders } = useOrdersStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAdmin) {
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <div className="grid place-items-center">
                <div className="w-3/4 p-16 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-12">
                    <MoviesInStock movies={movies} />
                    <br />
                    <div className="grid grid-cols-2 gap-4">
                        <Orders orders={orders} />
                        <Purchases purchases={purchases} />
                    </div>
                </div>
            </div>
            <br />
        </>
    );
};
