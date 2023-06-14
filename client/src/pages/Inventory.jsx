import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";
import dayjs from "dayjs";
// import "moment-timezone";
// import Moment from 'react-moment';

export const Inventory = () => {
    const { movies, orders, purchases } = useMovies();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAdmin) {
            navigate("/");
        }
    }, [user]);

    const OrderCard = (order) => {
        return (
            <>
                <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-gray-900 truncate dark:text-white">
                                {order.order.user.username}
                            </p>
                            {order.order.movies.map((movie) => (
                                <p className=" text-gray-500 truncate dark:text-gray-400">
                                    {movie.movie.title} - {movie.quantity}
                                </p>
                            ))}
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            {dayjs(order.order.createdAt).format("MM/DD/YY HH:mm:ss")}
                        </div>
                    </div>
                </li>
            </>
        );
    };

    const PurchaseCard = (purchase) => {
        return (
            <>
                <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-gray-900 truncate dark:text-white">
                                {purchase.purchase.user.username}
                            </p>
                            {purchase.purchase.movies.map((movie) => (
                                <p className=" text-gray-500 truncate dark:text-gray-400">
                                    {movie.movie.title} - {movie.quantity}
                                </p>
                            ))}
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            {dayjs(purchase.purchase.createdAt).format("MM/DD/YY HH:mm:ss")}
                        </div>
                    </div>
                </li>
            </>
        );
    };

    return (
        <>
            <div className="grid place-items-center mx-72">
                <div class="w-full p-16 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-12">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Inventory
                        </h5>
                    </div>
                    <div class="flow-root">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Movie Title
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Stock
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Year
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movies.map((movie) => (
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {movie.title}
                                            </th>
                                            <td class="px-6 py-4">{movie.stock}</td>
                                            <td class="px-6 py-4">{movie.year}</td>
                                            <td class="px-6 py-4">${movie.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br />
                    <div className="grid grid-cols-2 gap-4">
                        <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ml-24">
                            <div class="flex items-center justify-between mb-4">
                                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                    Orders
                                </h5>
                            </div>
                            <div class="flow-root">
                                <ul
                                    role="list"
                                    class="divide-y divide-gray-200 dark:divide-gray-700"
                                >
                                    {orders.map((order) => (
                                        <OrderCard order={order} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ml-14">
                            <div class="flex items-center justify-between mb-4">
                                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                    Purchases
                                </h5>
                            </div>
                            <div class="flow-root">
                                <ul
                                    role="list"
                                    class="divide-y divide-gray-200 dark:divide-gray-700"
                                >
                                    {purchases.map((purchase) => (
                                        <PurchaseCard purchase={purchase} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {/* <div class="flow-root">
                {orders.map((order) => (
                    <OrderCard order={order} />
                ))}
            </div>
            <div class="flow-root">
                {purchases.map((purchase) => (
                    <PurchaseCard purchase={purchase} />
                ))}
            </div> */}
        </>
    );
};
