import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";

export const NavbarIsNotAuth = () => {
    return (
        <NavbarContent justify="end">
            <NavbarItem>
                <Button as={Link} href="/register" variant="flat">
                    Register
                </Button>
            </NavbarItem>
            <NavbarItem isActive={true}>
                <Button as={Link} color="primary" href="/login" variant="flat">
                    Login
                </Button>
            </NavbarItem>
        </NavbarContent>
    );
};
