import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NavSearch } from "./NavSearch";

export const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    return (
        <nav className="bg-zinc-700 w-full flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold">Penguin Movies</h1>
            <ul className="flex gap-x-2">
                {isAuthenticated && user.isAdmin && (
                    <li>
                        <Link className="mb-4" to={"/order/new"}>
                            New Order
                        </Link>
                    </li>
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
                    <>
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>
                        <li>
                            <Link to={"/register"}>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};
