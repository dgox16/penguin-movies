import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNewOrder } from "../hooks/orders/useNewOrder.js";
import { MoviesInOrder } from "../components/newOrder/MoviesInOrder";
import { OrderSearch } from "../components/newOrder/OrderSearch";
import { SectionNewMovie } from "../components/newOrder/SectionNewMovie";
import { useAuthStore } from "../store/auth";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

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
            navigate("/");
        }
    }, [user]);

    return (
        <div className="flex justify-center mt-3 mx-6">
            <Card className="w-[122ch] p-2 sm:p-4">
                <CardHeader className="flex gap-3 mb-3">
                    <div className="flex flex-col">
                        <p className="text-2xl sm:text-3xl font-bold">New Order</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <OrderSearch
                        moviesInSelect={moviesInSelect}
                        updateMoviesSelect={updateMoviesSelect}
                    />
                    <MoviesInOrder
                        updateQuantity={updateQuantity}
                        deleteMoviesSelect={deleteMoviesSelect}
                        moviesInOrder={moviesInOrder}
                    />
                    <SectionNewMovie />
                </CardBody>
            </Card>
        </div>
    );
};
