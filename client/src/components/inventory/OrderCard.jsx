import dayjs from "dayjs";
export const OrderCard = (order) => {
    return (
        <>
            <li className="py-3 sm:py-4" key={order._id}>
                <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate dark:text-white">
                            {order.order.user.username}
                        </p>
                        {order.order.movies.map((movie) => (
                            <p
                                className=" text-gray-500 truncate dark:text-gray-400"
                                key={movie.movie._id}
                            >
                                {movie.movie.title} - {movie.quantity}
                            </p>
                        ))}
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {dayjs(order.order.createdAt).format("MM/DD/YY HH:mm:ss")}
                    </div>
                </div>
            </li>
        </>
    );
};
