import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import { NewOrder } from "./pages/NewOrder";
import { ViewMovie } from "./pages/ViewMovie";
import { ShoppingCart } from "./pages/ShoppingCart";
import { ProtectedLoading } from "./pages/ProtectedLoading";
import { Inventory } from "./pages/Inventory";
import { NavbarMain } from "./components/ui/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { useAuthStore } from "./store/auth";
import { useMoviesStore } from "./store/movies";
import { usePurchasesStore } from "./store/purchases";
import { useOrdersStore } from "./store/orders";
import { useShoppingCartStore } from "./store/shoppingCart";
import {
    getAllMoviesRequest,
    getPurchasesRequest,
    getShoppingCartRequest,
} from "./services/moviesAPI";
import { getOrdersRequest } from "./services/orderAPI";
import { useEffect } from "react";

function App() {
    const navigate = useNavigate();

    const { user } = useAuthStore();
    const {
        setMovies,
        setLoading: setLoadingMovies,
        loading: loadingMovies,
    } = useMoviesStore();
    const {
        setPurchases,
        setLoading: setLoadingPurchases,
        loading: loadingPurchases,
    } = usePurchasesStore();
    const {
        setOrders,
        setLoading: setLoadingOrders,
        loading: loadingOrders,
    } = useOrdersStore();
    const {
        setShoppingCart,
        setLoading: setLoadingSC,
        loading: loadingSC,
    } = useShoppingCartStore();

    useEffect(() => {
        const getData = async () => {
            const movies = await getAllMoviesRequest();
            setMovies(movies);
            setLoadingMovies(false);
        };
        const getPurchases = async () => {
            const p = await getPurchasesRequest();
            setPurchases(p);
            setLoadingPurchases(false);
        };
        const getOrders = async () => {
            const o = await getOrdersRequest();
            // console.log(o);
            setOrders(o);
            setLoadingOrders(false);
        };
        const getShoppingCart = async () => {
            const sc = await getShoppingCartRequest();
            setShoppingCart(sc);
            setLoadingSC(false);
        };
        if (user == null) {
            getData();
        } else {
            if (user.isAdmin) {
                getOrders();
                getPurchases();
            }
            console.info("Solicitud Grande");
            getShoppingCart();
            getData();
        }
    }, []);

    return (
        <NextUIProvider navigate={navigate}>
            <main className="dark text-foreground bg-background">
                <NavbarMain />
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/order/new" element={<NewOrder />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/shoppingCart" element={<ShoppingCart />} />
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
