import { createContext, useContext, useEffect, useState } from "react";
import { handleLogin, handleRegister, verifyTokenRequest } from "../services/usersAdministration";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("UseAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const checkLogin = async () => {
        const cookies = Cookies.get();
        if (!cookies.token) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
        try {
            const res = await verifyTokenRequest(cookies.token);
            if (!res) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
            setIsAuthenticated(true);
            setUser(res);
            setLoading(false);
        } catch (_error) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    const signup = async (values) => {
        try {
            const res = await handleRegister(values);
            setUser(res);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const signin = async (values) => {
        try {
            const res = await handleLogin(values);
            setUser(res);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const logout = async () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                user,
                isAuthenticated,
                errors,
                checkLogin,
                loading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
