import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";

export const NavbarIsNotAuth = () => {
    return (
        <NavbarContent className="hidden md:flex gap-4" justify="end">
            <NavbarItem>
                <Button as={Link} href="/register" color="warning" variant="flat">
                    Register
                </Button>
            </NavbarItem>
            <NavbarItem isActive={true}>
                <Button as={Link} color="success" href="/login" variant="flat">
                    Login
                </Button>
            </NavbarItem>
        </NavbarContent>
    );
};
