import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleLogin } from "../services/usersAdministration";
import { useAuthStore } from "../store/auth";
import { Button, Card, CardBody, Input, Spacer } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../assets/icons/EyeFilledIcon";
import { useMoviesStore } from "../store/movies";
import { usePurchasesStore } from "../store/purchases";
import { useOrdersStore } from "../store/orders";
import { useShoppingCartStore } from "../store/shoppingCart";
import {
    getMovies,
    getOrders,
    getPurchases,
    getShoppingCart,
} from "../functions/getData";

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { setPurchases, setLoading: setLoadingPurchases } = usePurchasesStore();
    const { setOrders, setLoading: setLoadingOrders } = useOrdersStore();
    const { setShoppingCart, setLoading: setLoadingShoppingCart } =
        useShoppingCartStore();

    const navigate = useNavigate();
    const { setUser, isAuthenticated, errors: loginError, setErrors } = useAuthStore();

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (loginError.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [loginError]);

    const signin = async (values) => {
        try {
            const res = await handleLogin(values);
            setUser(res);

            if (res.isAdmin) {
                getOrders(setOrders, setLoadingOrders);
                getPurchases(setPurchases, setLoadingPurchases);
            }
            getShoppingCart(setShoppingCart, setLoadingShoppingCart);
            navigate("/");
        } catch (error) {
            console.info(error.response.data);
            setErrors(error.response.data);
        }
    };

    const onSubmit = handleSubmit((values) => {
        signin(values);
    });

    return (
        <>
            <div className="flex justify-center h-screen -mt-16 pt-16 items-center">
                <Card className="mx-6">
                    <CardBody>
                        {loginError.map((err) => (
                            <div className="bg-red-500 text-white rounded-md" key={err}>
                                {err}
                            </div>
                        ))}
                        <form onSubmit={onSubmit}>
                            <Input
                                {...register("username", {
                                    required: "This is required",
                                })}
                                type="text"
                                variant="bordered"
                                size="lg"
                                label="Username"
                                labelPlacement={"outside"}
                                placeholder="Enter your username"
                                isInvalid={errors.username ? true : false}
                                errorMessage={errors.username?.message}
                            />
                            <Spacer y={6} />
                            <Input
                                {...register("password", {
                                    required: "This is required",
                                })}
                                size="lg"
                                label="Password"
                                variant="bordered"
                                placeholder="Enter your password"
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                labelPlacement={"outside"}
                                isInvalid={errors.password ? true : false}
                                errorMessage={errors.password?.message}
                            />
                            <Spacer y={8} />
                            <Button type="submit" className="w-full" color="success">
                                Login
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};
