import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

export const NavbarList = ({ user, logout }) => {
    const menuItems = [
        { label: "View movies", url: "/", onlyAdmin: false },
        { label: "Shopping cart", url: "/shoppingCart", onlyAdmin: false },
        { label: "Inventory", url: "/inventory", onlyAdmin: true },
        { label: "New order", url: "/order/new", onlyAdmin: true },
        { label: "Logout", url: "/", onlyAdmin: false },
    ];

    return (
        <NavbarMenu>
            {user ? (
                user.isAdmin ? (
                    menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={item.label === "Logout" ? "danger" : "foreground"}
                                className="w-full text-2xl font-bold"
                                href={item.url}
                                size="lg"
                                onPress={item.label === "Logout" ? logout : null}
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))
                ) : (
                    menuItems
                        .filter((item) => !item.onlyAdmin)
                        .map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={
                                        item.label === "Logout" ? "danger" : "foreground"
                                    }
                                    className="w-full text-2xl font-bold"
                                    href={item.url}
                                    size="lg"
                                    onPress={item.label === "Logout" ? logout : null}
                                >
                                    {item.label}
                                </Link>
                            </NavbarMenuItem>
                        ))
                )
            ) : (
                <NavbarMenuItem>
                    <Link
                        color="foreground"
                        className="w-full text-2xl font-bold"
                        href="/"
                        size="lg"
                    >
                        View Movies
                    </Link>
                    <Link
                        color="success"
                        className="w-full text-2xl font-bold"
                        href="/login"
                        size="lg"
                    >
                        Login
                    </Link>
                    <Link
                        color="warning"
                        className="w-full text-2xl font-bold"
                        href="/register"
                        size="lg"
                    >
                        Register
                    </Link>
                </NavbarMenuItem>
            )}
        </NavbarMenu>
    );
};
