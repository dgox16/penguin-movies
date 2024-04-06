import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import { NewOrder } from "./pages/NewOrder";
import { ViewMovie } from "./pages/ViewMovie";
import { ShoppingCart } from "./pages/ShoppingCart";
import { Inventory } from "./pages/Inventory";
import { NextUIProvider } from "@nextui-org/react";
import { useAuthStore } from "./store/auth";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { useAllDataFetch } from "./hooks/shoppingCart/useAllDataFetch";
import { Purchases } from "./pages/Purchases";
import { NavbarMain } from "./components/ui/Navbar/NavbarMain";

function App() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { loadingMovies, loadingOrders, loadingPurchases, loadingShoppingCart } =
        useAllDataFetch();

    if (user === null && loadingMovies) {
        return <LoadingScreen />;
    }

    if (user !== null) {
        if (user.isAdmin && (loadingOrders || loadingPurchases)) {
            return <LoadingScreen />;
        }

        if (loadingMovies || loadingShoppingCart) {
            return <LoadingScreen />;
        }
    }

    return (
        <NextUIProvider navigate={navigate}>
            <header>
                <NavbarMain />
            </header>
            <main className="dark text-foreground bg-background">
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/orders/new" element={<NewOrder />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/shoppingCart" element={<ShoppingCart />} />
                        <Route path="/purchases" element={<Purchases />} />
                    </Route>
                    <Route path="/movies/:id" element={<ViewMovie />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </NextUIProvider>
    );
}

export default App;
