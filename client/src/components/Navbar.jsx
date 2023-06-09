import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    return (
        <nav className="bg-zinc-700 mb-3 w-full flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold">Penguin Movies</h1>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to={"/home"}>View movies</Link>
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
