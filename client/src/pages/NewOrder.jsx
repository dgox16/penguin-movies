import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNewOrder } from "../hooks/orders/useNewOrder.js";
import { ListMoviesInOrder } from "../components/newOrder/ListMoviesInOrder";
import { OrderSearch } from "../components/newOrder/OrderSearch";
import { ButtonSubmit } from "../components/newOrder/ButtonSubmit";
import { SectionNewMovie } from "../components/newOrder/SectionNewMovie";
import { useAuthStore } from "../store/auth";

export const NewOrder = () => {
    const { user } = useAuthStore();
    const {
        moviesInSelect,
        moviesInOrder,
        updateMoviesSelect,
        updateQuantity,
        deleteMoviesSelect,
    } = useNewOrder();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAdmin) {
            console.info("dsacas");
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <div className="grid place-items-center">
                <div className="w-3/4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-12">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            New order
                        </h5>
                        <OrderSearch
                            moviesInSelect={moviesInSelect}
                            updateMoviesSelect={updateMoviesSelect}
                        />
                    </div>
                    <div className="flow-root">
                        <ListMoviesInOrder
                            updateQuantity={updateQuantity}
                            deleteMoviesSelect={deleteMoviesSelect}
                            moviesInOrder={moviesInOrder}
                        />
                    </div>
                    <ButtonSubmit moviesInOrder={moviesInOrder} />
                    <SectionNewMovie />
                </div>
            </div>
        </>
    );
};
