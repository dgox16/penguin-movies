import { useLocation, useNavigate } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";
import { useEffect, useState } from "react";

export const ProtectedLoading = ({ children }) => {
    const { loadingMovies, loadingSC, loadingOrders, loadingPurchases } = useMovies();
    const [isInLogin, setIsInLogin] = useState(false);

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/register") {
            setIsInLogin(true);
        }
    }, []);

    if (isInLogin) {
        if (loadingMovies || loadingSC || loadingOrders || loadingPurchases) {
            return <div>{children}</div>;
        }
    }
    if (loadingMovies || loadingSC || loadingOrders || loadingPurchases) {
        return <div>Loading</div>;
    }

    return <div>{children}</div>;
};
