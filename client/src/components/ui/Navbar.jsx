import { useState } from "react";
import {
    Button,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
} from "@nextui-org/react";
import { NavbarIsAuth } from "./NavbarIsAuth";
import { useAuthStore } from "../../store/auth";
import { TbUser, TbLogout, TbSearch } from "react-icons/tb";
import { NavbarIsNotAuth } from "./NavbarIsNotAuth";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../services/authRequest";
import { NavbarList } from "./NavbarMenu";
import { useOrdersStore } from "../../store/orders";
import { usePurchasesStore } from "../../store/purchases";
import { useShoppingCartStore } from "../../store/shoppingCart";
import { NavbarSearch } from "./NavbarSearch";
import { IconContext } from "react-icons";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";

export const NavbarMain = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore();
    const { resetOrders } = useOrdersStore();
    const { resetPurchases } = usePurchasesStore();
    const { resetShoppingCart } = useShoppingCartStore();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                    <Link className="font-bold text-inherit" href="/">
                        Penguin Movies
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {isAuthenticated && <NavbarIsAuth user={user} logout={logoutToLogin} />}

            <NavbarContent justify="end">
                {isAuthenticated ? (
                    <NavbarItem>
                        <Button
                            as={Link}
                            href="/"
                            variant="flat"
                            size="lg"
                            color="danger"
                            isIconOnly={true}
                            onClick={logout}
                        >
                            <IconContext.Provider value={{ size: "24" }}>
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
                            size="lg"
                            color="success"
                            isIconOnly={true}
                        >
                            <IconContext.Provider value={{ size: "24" }}>
                                <TbUser />
                            </IconContext.Provider>
                        </Button>
                    </NavbarItem>
                )}
                <NavbarItem>
                    <Button onPress={onOpen} isIconOnly={true} size="lg">
                        <IconContext.Provider value={{ size: "24" }}>
                            <TbSearch />
                        </IconContext.Provider>
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        Movie Finder
                                    </ModalHeader>
                                    <ModalBody>
                                        <NavbarSearch onClose={onClose} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="danger"
                                            variant="light"
                                            onPress={onClose}
                                        >
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                    {/* <NavbarSearch /> */}
                </NavbarItem>
            </NavbarContent>

            <NavbarList user={user} logout={logoutToLogin} />
        </Navbar>
    );
};
