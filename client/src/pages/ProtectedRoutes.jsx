import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <h1>Loading</h1>;
    }
    if (!(loading || isAuthenticated)) {
        return <Navigate to="/login" replace={true} />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};
