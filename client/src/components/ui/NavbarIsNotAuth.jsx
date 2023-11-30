import { NavbarLink } from "./NavbarLink";

export const NavbarIsNotAuth = () => {
    return (
        <>
            <NavbarLink name={"Login"} redirectTo={"/login"} isHighlighted={false} />
            <NavbarLink name={"Register"} redirectTo={"/register"} isHighlighted={false} />
        </>
    );
};
