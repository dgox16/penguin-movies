import Movie from "../models/Movie.js";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";
import ShoppingCart from "../models/ShoppingCart.js";
import { ObjectId } from "mongodb";

export const getShoppingCart = async (req, res) => {
	try {
		const userLogged = await User.findById(req.user.id);

		if (!userLogged.shoppingCart) {
			return res
				.status(400)
				.json({ error: "El usuario no tiene un carrito asignado" });
		}

		const shoppingCart = await ShoppingCart.findById(
			userLogged.shoppingCart,
		).populate("movies.movie");

		if (!shoppingCart) {
			console.error("Carrito no encontrado en la base de datos");
			return res
				.status(404)
				.json({ error: "Carrito no encontrado en la base de datos" });
		}

		const shoppingCartFormatted = shoppingCart.movies
			.map((item) => {
				if (!item.movie) return null;
				const { _id, title, price, stock } = item.movie;

				return {
					id: _id,
					title,
					price,
					stock,
					quantity: item.quantity,
				};
			})
			.filter(Boolean);

		res.json(shoppingCartFormatted);
	} catch (error) {
		console.error("Error al obtener el carrito:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

export const updateShoppingCart = async (req, res) => {
	const movies = req.body.map((m) => {
		return {
			...m,
			movie: new ObjectId(m.movie),
		};
	});

	const shoppingCartModified = await ShoppingCart.findByIdAndUpdate(
		req.user.shoppingCart,
		{ movies },
		{ new: true },
	);
	res.json(shoppingCartModified);
};

export const buyShoppingCart = async (req, res) => {
	const shoppingCart = await ShoppingCart.findById(
		req.user.shoppingCart,
	).populate("movies.movie");

	shoppingCart.movies.forEach(async (movie) => {
		await Movie.findByIdAndUpdate(
			movie.movie,
			{ $inc: { stock: -movie.quantity } },
			{ new: true },
		);
	});

	const movies = shoppingCart.movies.map((movie) => {
		return {
			movie: movie.movie,
			quantity: movie.quantity,
		};
	});

	const newPurchase = new Purchase({ user: req.user.id, movies });
	await newPurchase.save();

	const { _id, createdAt } = newPurchase;
	const moviesFormatted = movies.map((item) => {
		const { _id, title } = item.movie;
		return {
			id: _id,
			title,
			quantity: item.quantity,
		};
	});

	const purchaseFormatted = {
		id: _id,
		user: req.user.username,
		movies: moviesFormatted,
		createdAt: createdAt,
	};

	await ShoppingCart.findByIdAndUpdate(
		req.user.shoppingCart,
		{ movies: [] },
		{ new: true },
	);

	res.json(purchaseFormatted);
};
