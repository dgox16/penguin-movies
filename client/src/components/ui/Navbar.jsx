import { useAuthStore } from "../../store/auth";
import { NavbarButtons } from "./NavbarButtons";
import { NavbarSearch } from "./NavbarSearch";

export const Navbar = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Penguin-Movies
                </span>
                <div className="flex md:order-2">{isAuthenticated && <NavbarSearch />}</div>
                <NavbarButtons />
            </div>
        </nav>
    );
};
