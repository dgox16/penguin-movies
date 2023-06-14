import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NavSearch } from "./NavSearch";

export const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    return (
        <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Penguin-Movies
                </span>
                <div className="flex md:order-2">
                    {isAuthenticated && <NavSearch />}
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link
                                        className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                        to={"/"}
                                    >
                                        View movies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                        to={"/shoppingCart"}
                                    >
                                        Shopping Cart
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                        to={"/login"}
                                        onClick={() => {
                                            logout();
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                        to={"/login"}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                        to={"/register"}
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {isAuthenticated && user.isAdmin && (
                            <>
                                <li>|</li>
                                <li>
                                    <Link
                                        to={"/order/new"}
                                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        New Order
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                        to={"/inventory"}
                                    >
                                        Inventory
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
        /* 
        <nav className="bg-zinc-700 w-full flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold">Penguin Movies</h1>
            <ul className="flex gap-x-2">
                {isAuthenticated && user.isAdmin && (
                    <>
                        <li>
                            <Link className="mb-4" to={"/order/new"}>
                                New Order
                            </Link>
                        </li>
                        <li>
                            <Link className="mb-4" to={"/inventory"}>
                                Inventory
                            </Link>
                        </li>
                    </>
                )}
                {isAuthenticated ? (
                    <>
                        <li>
                            <NavSearch />
                        </li>
                        <li>
                            <Link className="mb-4" to={"/"}>
                                View movies
                            </Link>
                        </li>
                        <li>
                            <Link className="mb-4" to={"/shoppingCart"}>
                                Shopping Cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/login"}
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                )}
            </ul>
        </nav> */
    );
};
