import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    Link,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/react";
import { NavbarIsAuth } from "./NavbarIsAuth";
import { useAuthStore } from "../../store/auth";
import { NavbarIsNotAuth } from "./NavbarIsNotAuth";

export const NavbarMain = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const { isAuthenticated } = useAuthStore();
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar maxWidth="xl" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                {isAuthenticated && (
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="lg:hidden"
                    />
                )}
                <NavbarBrand>
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>

            {isAuthenticated ? <NavbarIsAuth /> : <NavbarIsNotAuth />}

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2
                                    ? "primary"
                                    : index === menuItems.length - 1
                                      ? "danger"
                                      : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};
