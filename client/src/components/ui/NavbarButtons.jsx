import { NavbarIsAuth } from "./NavbarIsAuth";
import { NavbarIsNotAuth } from "./NavbarIsNotAuth";
import { NavbarIsAdmin } from "./NavbarIsAdmin";
import { useAuthStore } from "../../store/auth";

export const NavbarButtons = () => {
    const { isAuthenticated, user } = useAuthStore();

    return (
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {isAuthenticated ? <NavbarIsAuth /> : <NavbarIsNotAuth />}
                {isAuthenticated && user.isAdmin && <NavbarIsAdmin />}
            </ul>
        </div>
    );
};
