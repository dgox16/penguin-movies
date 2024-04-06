import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import { NavbarIsAuth } from "./NavbarIsAuth";
import { useAuthStore } from "../../../store/auth";
import { TbLogout, TbUser } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../../services/authRequest";
import { useOrdersStore } from "../../../store/orders";
import { usePurchasesStore } from "../../../store/purchases";
import { useShoppingCartStore } from "../../../store/shoppingCart";
import { IconContext } from "react-icons";
import { useScreenSize } from "../../../hooks/useSizeWindow";
import { NavbarSearch } from "./NavbarSearch";

export const NavbarMain = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const { resetOrders } = useOrdersStore();
    const { resetPurchases } = usePurchasesStore();
    const { resetShoppingCart } = useShoppingCartStore();
    const { width } = useScreenSize();

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

    const elementsWidth =
        width < 640
            ? { buttonSize: "sm", iconSize: "20" }
            : { buttonSize: "md", iconSize: "23" };

    return (
        <Navbar maxWidth="xl">
            <NavbarContent>
                <NavbarBrand>
                    <Link className="font-bold text-inherit" href="/">
                        PENGUIN MOVIES
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                {isAuthenticated && (
                    <NavbarIsAuth
                        user={user}
                        logout={logoutToLogin}
                        elementsWidth={elementsWidth}
                    />
                )}
                <NavbarItem>
                    <NavbarSearch elementsWidth={elementsWidth} />
                </NavbarItem>

                {isAuthenticated ? (
                    <NavbarItem>
                        <Button
                            as={Link}
                            href="/"
                            variant="light"
                            size={elementsWidth.buttonSize}
                            color="danger"
                            isIconOnly={true}
                            onPress={logout}
                        >
                            <IconContext.Provider
                                value={{ size: elementsWidth.iconSize }}
                            >
                                <TbLogout />
                            </IconContext.Provider>
                        </Button>
                    </NavbarItem>
                ) : (
                    <NavbarItem>
                        <Button
                            as={Link}
                            href="/login"
                            variant="flat"
                            size={elementsWidth.buttonSize}
                            color="success"
                            isIconOnly={true}
                        >
                            <IconContext.Provider
                                value={{ size: elementsWidth.iconSize }}
                            >
                                <TbUser />
                            </IconContext.Provider>
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar>
    );
};
