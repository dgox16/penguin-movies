import { OrderCard } from "./OrderCard";

export const Orders = ({ orders }) => {
    return (
        <>
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ml-24">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        Orders
                    </h5>
                </div>
                <div className="flow-root">
                    <ul
                        role="list"
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                        {orders.map((order) => (
                            <OrderCard order={order} key={order._id} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
