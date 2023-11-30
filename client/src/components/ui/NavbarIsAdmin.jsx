import { NavbarLink } from "./NavbarLink";

export const NavbarIsAdmin = () => {
    return (
        <>
            <li>|</li>
            <NavbarLink name={"New Order"} redirectTo={"/order/new"} isHighlighted={false} />
            <NavbarLink name={"Inventory"} redirectTo={"/inventory"} isHighlighted={false} />
        </>
    );
};
