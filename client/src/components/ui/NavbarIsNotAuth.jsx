import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";

export const NavbarIsNotAuth = () => {
    return (
        <NavbarContent className="hidden md:flex gap-4" justify="center">
            <NavbarItem isActive={true}>
                <Link className="text-small lg:text-base" href="/">
                    View movies
                </Link>
            </NavbarItem>
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
