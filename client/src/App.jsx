import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import { NewOrder } from "./pages/NewOrder";
import { ViewMovie } from "./pages/ViewMovie";
import { ShoppingCart } from "./pages/ShoppingCart";
import { ProtectedLoading } from "./pages/ProtectedLoading";
import { Inventory } from "./pages/Inventory";
import { Navbar } from "./components/ui/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<ProtectedLoading />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/order/new" element={<NewOrder />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/shoppingCart" element={<ShoppingCart />} />
                        <Route path="/movies/:id" element={<ViewMovie />} />
                    </Route>
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
