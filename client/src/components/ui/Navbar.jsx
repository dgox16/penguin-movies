import { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
} from "@nextui-org/react";
import { NavbarIsAuth } from "./NavbarIsAuth";
import { useAuthStore } from "../../store/auth";
import { NavbarIsNotAuth } from "./NavbarIsNotAuth";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../services/usersAdministration";
import { NavbarList } from "./NavbarMenu";
import { useOrdersStore } from "../../store/orders";
import { usePurchasesStore } from "../../store/purchases";
import { useShoppingCartStore } from "../../store/shoppingCart";
import { NavbarSearch } from "./NavbarSearch";

export const NavbarMain = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore();
    const { resetOrders } = useOrdersStore();
    const { resetPurchases } = usePurchasesStore();
    const { resetShoppingCart } = useShoppingCartStore();

    const navigate = useNavigate();

    const logoutToLogin = async () => {
        const { isSessionClosed } = await logoutRequest();
        if (isSessionClosed) {
            logout();
            resetOrders();
            resetPurchases();
            resetShoppingCart();
            navigate("/");
        }
    };

    return (
        <Navbar maxWidth="xl" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="md:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">PEDG</p>
                </NavbarBrand>
            </NavbarContent>

            {isAuthenticated ? (
                <NavbarIsAuth user={user} logout={logoutToLogin} />
            ) : (
                <NavbarIsNotAuth />
            )}

            <NavbarContent justify="end">
                <NavbarItem>
                    <NavbarSearch />
                </NavbarItem>
            </NavbarContent>

            <NavbarList user={user} logout={logoutToLogin} />
        </Navbar>
    );
};
