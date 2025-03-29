import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import {
	Link,
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	Spacer,
} from "@nextui-org/react";
import {
	EyeFilledIcon,
	EyeSlashFilledIcon,
} from "../assets/icons/EyeFilledIcon";
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
	const {
		setUser,
		isAuthenticated,
		errors: loginError,
		setErrors,
	} = useAuthStore();

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
			<div className="flex justify-center h-auto sm:h-screen mt-5 sm:-mt-16 pt-0 sm:pt-16 items-center">
				<Card className="px-3 py-5 mx-3 xs:mx-3">
					<CardHeader className="mt-2">
						<p className="pb-4 text-left text-3xl font-bold">
							Log In
							<span aria-label="emoji" className="ml-2" role="img">
								👋
							</span>
						</p>
					</CardHeader>
					<CardBody>
						<div className="">
							{loginError.map((err) => (
								<div
									className="bg-red-500 mb-12 font-bold text-center text-white rounded-md p-4"
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
									className="font-semibold"
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
									className="font-semibold"
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
								<Spacer y={4} />
								<div className="flex justify-end">
									<Link className="italic" href="/register" color="success">
										Or create a new account
									</Link>
								</div>
								<Spacer y={4} />
								<Button type="submit" className="w-full" color="success">
									Login
								</Button>
							</form>
						</div>
					</CardBody>
				</Card>
			</div>
		</>
	);
};
