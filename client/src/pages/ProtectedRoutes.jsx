import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
import { verifyTokenRequest } from "../services/authRequest";

export const ProtectedRoutes = () => {
    const { isAuthenticated, logout, setLoading, setUser } = useAuthStore();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await verifyTokenRequest();
                if (!res) {
                    logout();
                }
                setUser(res);
            } catch (error) {
                console.error("Error:", error);
                logout();
            } finally {
                setLoading(false);
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
