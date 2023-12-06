import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
import { verifyTokenRequest } from "../services/usersAdministration";

export const ProtectedRoutes = () => {
    const { isAuthenticated, token, logout, setLoading, setToken, setUser } =
        useAuthStore();

    useEffect(() => {
        const checkLogin = async () => {
            if (token === "") {
                logout();
                setLoading(false);
                return;
            } else {
                try {
                    const res = await verifyTokenRequest(token);
                    if (!res) {
                        logout();
                        setLoading(false);
                        return;
                    }
                    setUser(res);
                    setToken(res.token);
                    setLoading(false);
                } catch (_error) {
                    logout();
                    setLoading(false);
                    return;
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
