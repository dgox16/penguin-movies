import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import { Navbar } from "./components/Navbar";
import { MoviesProvider } from "./context/MoviesContext";
import { NewOrder } from "./pages/NewOrder";
import { ViewMovie } from "./pages/ViewMovie";
import { ShoppingCart } from "./pages/ShoppingCart";
import { ProtectedLoading } from "./pages/ProtectedLoading";
import { Inventory } from "./pages/Inventory";

function App() {
    return (
        <AuthProvider>
            <MoviesProvider>
                <BrowserRouter>
                    <ProtectedLoading>
                        <Navbar />
                        <Routes>
                            <Route element={<ProtectedRoutes />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/order/new" element={<NewOrder />} />
                                <Route path="/inventory" element={<Inventory />} />
                                <Route path="/shoppingCart" element={<ShoppingCart />} />
                                <Route path="/movies/:id" element={<ViewMovie />} />
                            </Route>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </ProtectedLoading>
                </BrowserRouter>
            </MoviesProvider>
        </AuthProvider>
    );
}

export default App;
