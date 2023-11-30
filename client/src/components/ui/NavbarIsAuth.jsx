import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { NavbarLink } from "./NavbarLink";
import Cookies from "js-cookie";

export const NavbarIsAuth = () => {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const logoutAndLogin = () => {
        logout();
        Cookies.remove("token");
        navigate("login");
    };

    return (
        <>
            <NavbarLink name={"View movies"} redirectTo={"/"} isHighlighted={true} />
            <NavbarLink name={"Shopping Cart"} redirectTo={"/shoppingCart"} isHighlighted={false} />
            <NavbarLink
                name={"Logout"}
                redirectTo={"/"}
                isHighlighted={false}
                onClick={logoutAndLogin}
            />
        </>
    );
};
