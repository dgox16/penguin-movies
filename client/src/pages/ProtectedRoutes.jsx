import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
import { verifyTokenRequest } from "../services/usersAdministration";
import Cookies from "js-cookie";

export const ProtectedRoutes = () => {
    const { isAuthenticated, logout, loading, setLoading, setToken, setUser } =
        useAuthStore();

    const navigate = useNavigate();
    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                console.log("primer fallo");
                logout();
                setLoading(false);
                navigate("/login", { replace: true });
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res) {
                    console.log("segundo fallo");
                    logout();
                    setLoading(false);
                    navigate("/login");
                }

                console.log("segundo fallo");
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

    if (loading) {
        return <p>Loading</p>;
    } else {
        if (!isAuthenticated) {
            console.log("asxd");
            return <Navigate to="/login" />;
        } else {
            console.info("xsaxsaxsaxsa");
            return (
                <div>
                    <Outlet />
                </div>
            );
        }
    }
};
