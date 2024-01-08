import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
import { verifyTokenRequest } from "../services/usersAdministration";

export const ProtectedRoutes = () => {
    const { isAuthenticated, logout, setLoading, setUser } = useAuthStore();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await verifyTokenRequest();
                if (!res) {
                    logout();
                    setLoading(false);
                    return;
                }
                setUser(res);
                setLoading(false);
            } catch (_error) {
                logout();
                setLoading(false);
                return;
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
