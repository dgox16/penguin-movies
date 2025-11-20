import Purchase from "../models/Purchase.js";

export const getAllPurchases = async (req, res) => {
    const purchases = await Purchase.find()
        .populate("movies.movie")
        .populate("user");

    const purchasesFormatted = purchases.map((item) => {
        const { _id, user, movies, createdAt } = item;
        const moviesFormatted = movies.map((item) => {
            const { _id, title } = item.movie;
            return {
                id: _id,
                title,
                quantity: item.quantity,
            };
        });

        return {
            id: _id,
            user: user.username,
            movies: moviesFormatted,
            createdAt: createdAt,
        };
    });

    res.json(purchasesFormatted);
};
