import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useEffect } from "react";
import { verifyTokenRequest } from "../services/usersAdministration";
import Cookies from "js-cookie";

export const ProtectedRoutes = () => {
    // const { isAuthenticated, logout, setLoading, setToken, setUser } = useAuthStore();
    //
    // useEffect(() => {
    //     const checkLogin = async () => {
    //         const cookies = Cookies.get();
    //         if (!cookies.token) {
    //             console.log("Error");
    //             logout();
    //             setLoading(false);
    //         }
    //         try {
    //             const res = await verifyTokenRequest(cookies.token);
    //             if (!res) {
    //                 logout();
    //                 setLoading(false);
    //                 return;
    //             }
    //             setUser(res);
    //             setToken(res.token);
    //             setLoading(false);
    //         } catch (_error) {
    //             logout();
    //             setLoading(false);
    //         }
    //     };
    //
    //     checkLogin();
    // }, []);
    //
    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace={true} />;
    // }

    return (
        <div>
            <Outlet />
        </div>
    );
};
