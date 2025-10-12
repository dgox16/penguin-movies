import { Button, Card, CardBody } from "@heroui/react";
import { useViewMovie } from "../hooks/shoppingCart/useViewMovie.js";
import { useShoppingCartStore } from "../store/shoppingCart";
import { useAuthStore } from "../store/auth.js";
import { useUpdateShoppingCart } from "../hooks/shoppingCart/useUpdateShoppingCart.js";
import { LoadingScreen } from "../components/ui/LoadingScreen.jsx";
import { useScreenSize } from "../hooks/useSizeWindow.js";

export const ViewMovie = () => {
	const { isAuthenticated } = useAuthStore();
	const { movie, loading, alreadyInSc } = useViewMovie({ isAuthenticated });
	const { shoppingCart, setShoppingCart } = useShoppingCartStore();
	const { width } = useScreenSize();
	useUpdateShoppingCart();

	const addToShoppingCart = (movie) => {
		const newMovies = shoppingCart.concat({
			id: movie.id,
			title: movie.title,
			stock: movie.stock,
			price: movie.price,
			quantity: 1,
		});
		setShoppingCart(newMovies);
	};

	const buttonSize = width < 768 ? "md" : "lg";

	return (
		<>
			{loading ? (
				<LoadingScreen />
			) : (
				<div className="container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
					<Card className="w-full p-2 sm:p-4">
						<CardBody>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
								<div className="flex justify-center">
									<img
										className="w-full max-w-md md:max-w-full rounded-xl aspect-[3/4] object-cover"
										alt="Album cover"
										src={movie.image.url}
									/>
								</div>

								<div className="flex flex-col text-center md:text-left gap-4">
									<h1 className="text-3xl lg:text-5xl font-bold">
										{movie.title}
									</h1>

									<span className="text-2xl lg:text-4xl text-foreground-500">
										{movie?.year}
									</span>

									<p className="text-base lg:text-xl text-foreground-400">
										{movie.description
											? movie.description
											: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptate exercitationem eos veniam voluptatum soluta, fugit a eveniet quo sunt."}
									</p>

									<div className="mt-4 flex justify-center md:justify-start">
										<PurchaseButton
											movie={movie}
											isAuthenticated={isAuthenticated}
											alreadyInSc={alreadyInSc}
											addToShoppingCart={addToShoppingCart}
											buttonSize={buttonSize}
										/>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
			)}
		</>
	);
};
const PurchaseButton = ({
	movie,
	isAuthenticated,
	alreadyInSc,
	addToShoppingCart,
	buttonSize,
}) => {
	if (!isAuthenticated) {
		return null;
	}

	if (movie.stock <= 0) {
		return (
			<Button size={buttonSize} isDisabled color="default">
				No stock
			</Button>
		);
	}

	if (alreadyInSc) {
		return (
			<Button size={buttonSize} isDisabled color="primary">
				Already in shopping cart
			</Button>
		);
	}

	return (
		<Button
			color="primary"
			size={buttonSize}
			onClick={() => addToShoppingCart(movie)}
		>
			Add to shopping cart
		</Button>
	);
};
