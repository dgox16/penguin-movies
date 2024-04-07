import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import {
    Button,
    Link,
    Card,
    CardBody,
    CardHeader,
    Input,
    Spacer,
} from "@nextui-org/react";
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
                        <h1 className="text-4xl md:text-5xl font-black">REGISTER</h1>
                    </CardHeader>
                    <CardBody>
                        <div className="px-3 py-6 md:px-8 md:py-12">
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
                                    label="CREATE A NEW USER"
                                    className="font-semibold"
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
                                    label="CREATE A NEW PASSWORD"
                                    variant="bordered"
                                    className="font-semibold"
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
                                    className="font-semibold"
                                    label="WHAT IS YOUR FIRST NAME?"
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
                                    className="font-semibold"
                                    label="WHAT IS YOUR LAST NAME?"
                                    labelPlacement={"outside"}
                                    placeholder="Enter your last name"
                                    isInvalid={errors.lastName ? true : false}
                                    errorMessage={errors.lastName?.message}
                                />
                                <Spacer y={4} />
                                <div className="flex justify-end">
                                    <Link
                                        className="italic"
                                        href="/login"
                                        color="warning"
                                    >
                                        Or sign in to your account
                                    </Link>
                                </div>
                                <Spacer y={4} />
                                <Button type="submit" className="w-full" color="warning">
                                    Register
                                </Button>
                            </form>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};
