export const ListMoviesInOrder = ({ moviesInOrder, deleteMoviesSelect, updateQuantity }) => {
    return (
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {moviesInOrder.map((movie) => {
                return (
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <button
                                    className="text-white right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    type="button"
                                    onClick={deleteMoviesSelect}
                                    id={movie._id}
                                >
                                    X
                                </button>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate dark:text-white">
                                    {movie.title}
                                </p>
                                <p className=" text-gray-500 truncate dark:text-gray-400">
                                    Stock: {movie.stock}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <input
                                    type="number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16"
                                    placeholder=""
                                    onChange={(event) => {
                                        updateQuantity(event);
                                    }}
                                    min="1"
                                    name="quantity"
                                    id={movie._id}
                                />
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
