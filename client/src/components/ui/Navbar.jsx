import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";
import { NavbarIsAuth } from "./NavbarIsAuth";
import { useAuthStore } from "../../store/auth";
import { NavbarIsNotAuth } from "./NavbarIsNotAuth";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../services/usersAdministration";
import { NavbarList } from "./NavbarMenu";

export const NavbarMain = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore();

    const navigate = useNavigate();

    const logoutToLogin = async () => {
        const { isSessionClosed } = await logoutRequest();
        if (isSessionClosed) {
            logout();
            navigate("login");
        }
    };

    return (
        <Navbar maxWidth="xl" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                {isAuthenticated && (
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="md:hidden"
                    />
                )}
                <NavbarBrand>
                    <p className="font-bold text-inherit">PEDG</p>
                </NavbarBrand>
            </NavbarContent>

            {isAuthenticated ? (
                <NavbarIsAuth user={user} logout={logoutToLogin} />
            ) : (
                <NavbarIsNotAuth />
            )}

            {isAuthenticated && <NavbarList user={user} logout={logoutToLogin} />}
        </Navbar>
    );
};
