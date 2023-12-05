import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
import { verifyTokenRequest } from "../services/usersAdministration";
import Cookies from "js-cookie";

export const ProtectedRoutes = () => {
    const { isAuthenticated, token, logout, setLoading, setToken, setUser } =
        useAuthStore();

    useEffect(() => {
        const checkLogin = async () => {
            if (token === "") {
                logout();
                setLoading(false);
            } else {
                try {
                    const res = await verifyTokenRequest(token);
                    if (!res) {
                        logout();
                        setLoading(false);
                        return <Navigate to="/login" replace={true} />;
                    }
                    setUser(res);
                    console.log(res);
                    setToken(res.token);
                    setLoading(false);
                } catch (_error) {
                    logout();
                    setLoading(false);
                }
            }
        };

        checkLogin();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
