import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import { Button, Card, CardBody, CardHeader, Input, Spacer } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../assets/icons/EyeFilledIcon";
import { usePurchasesStore } from "../store/purchases";
import { useOrdersStore } from "../store/orders";
import { useShoppingCartStore } from "../store/shoppingCart";
import { getOrders, getPurchases, getShoppingCart } from "../functions/getData";
import { loginRequest } from "../services/authRequest";

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
            const res = await loginRequest(values);
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
                    <CardHeader className="flex items-center justify-center mb-5 mt-2">
                        <h1 className="text-4xl font-bold">LOGIN</h1>
                    </CardHeader>
                    <CardBody>
                        {loginError.map((err) => (
                            <div
                                className="bg-red-500 mb-3 font-bold text-center text-white rounded-md p-4"
                                key={err}
                            >
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
                                        onClick={() => setIsVisible(!isVisible)}
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
