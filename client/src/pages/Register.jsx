import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import { Button, Card, CardBody, CardHeader, Input, Spacer } from "@nextui-org/react";
import { getOrders, getPurchases, getShoppingCart } from "../functions/getData";
import { usePurchasesStore } from "../store/purchases";
import { useOrdersStore } from "../store/orders";
import { useShoppingCartStore } from "../store/shoppingCart";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../assets/icons/EyeFilledIcon";
import { registerRequest } from "../services/authRequest";

export const Register = () => {
    const [isVisible, setIsVisible] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { setPurchases, setLoading: setLoadingPurchases } = usePurchasesStore();
    const { setOrders, setLoading: setLoadingOrders } = useOrdersStore();
    const { setShoppingCart, setLoading: setLoadingShoppingCart } =
        useShoppingCartStore();

    const { setUser, isAuthenticated, errors: registerError, setErrors } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (registerError.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [registerError]);

    const signup = async (values) => {
        try {
            const res = await registerRequest(values);
            setUser(res);

            if (res.isAdmin) {
                getOrders(setOrders, setLoadingOrders);
                getPurchases(setPurchases, setLoadingPurchases);
            }
            getShoppingCart(setShoppingCart, setLoadingShoppingCart);
            navigate("/");
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const onSubmit = handleSubmit((values) => {
        signup(values);
    });

    return (
        <>
            <div className="flex justify-center h-screen -mt-16 pt-16 items-center">
                <Card className="mx-6">
                    <CardHeader className="flex items-center justify-center mb-5 mt-2">
                        <h1 className="text-4xl font-bold">REGISTER</h1>
                    </CardHeader>
                    <CardBody>
                        {registerError.map((err) => (
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
                                label="Create a new user"
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
                                label="Create a new password"
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
                            <Spacer y={6} />
                            <Input
                                {...register("firstName", {
                                    required: "This is required",
                                })}
                                type="text"
                                variant="bordered"
                                size="lg"
                                label="¿What is your first name?"
                                labelPlacement={"outside"}
                                placeholder="Enter your first name"
                                isInvalid={errors.firstName ? true : false}
                                errorMessage={errors.firstName?.message}
                            />
                            <Spacer y={6} />
                            <Input
                                {...register("lastName", {
                                    required: "This is required",
                                })}
                                type="text"
                                variant="bordered"
                                size="lg"
                                label="¿What is your last name?"
                                labelPlacement={"outside"}
                                placeholder="Enter your last name"
                                isInvalid={errors.lastName ? true : false}
                                errorMessage={errors.lastName?.message}
                            />
                            <Spacer y={8} />
                            <Button type="submit" className="w-full" color="warning">
                                Register
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};
