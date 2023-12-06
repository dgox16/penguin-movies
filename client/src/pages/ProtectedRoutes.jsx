import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
import { verifyTokenRequest } from "../services/usersAdministration";
import Cookies from "js-cookie";

export const ProtectedRoutes = () => {
    const { isAuthenticated, logout, setLoading, setToken, setUser } = useAuthStore();

    const navigate = useNavigate();
    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                console.log("primer fallo");
                logout();
                setLoading(false);
                navigate("/login");
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res) {
                    console.log("segundo fallo");
                    logout();
                    setLoading(false);
                    navigate("/login");
                }
                setUser(res);
                setToken(res.token);
                setLoading(false);
            } catch (_error) {
                logout();
                setLoading(false);
                navigate("/login");
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
