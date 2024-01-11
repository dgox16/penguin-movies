import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import { NavbarSearch } from "./NavbarSearch";

export const NavbarIsAuth = ({ user, logout }) => {
    return (
        <>
            <NavbarContent className="hidden md:flex gap-4" justify="center">
                <NavbarItem isActive={true}>
                    <Link className="text-small lg:text-base" href="/">
                        View movies
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        className="text-small lg:text-base"
                        href="/shoppingCart"
                        aria-current="page"
                    >
                        Shopping Cart
                    </Link>
                </NavbarItem>
                {user.isAdmin && (
                    <>
                        <NavbarItem>
                            <Link
                                color="foreground"
                                className="text-small lg:text-base"
                                href="/inventory"
                                aria-current="page"
                            >
                                Inventory
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link
                                color="foreground"
                                className="text-small lg:text-base"
                                href="/order/new"
                                aria-current="page"
                            >
                                New Order
                            </Link>
                        </NavbarItem>
                    </>
                )}
                <NavbarItem>
                    <Button
                        as={Link}
                        color="danger"
                        href="/"
                        size="sm"
                        variant="flat"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <NavbarSearch />
                </NavbarItem>
            </NavbarContent>
        </>
    );
};
