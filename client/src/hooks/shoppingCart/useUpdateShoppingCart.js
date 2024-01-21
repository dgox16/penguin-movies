import { useEffect, useState } from "react";
import { useShoppingCartStore } from "../../store/shoppingCart";
import { updateShoppingCartRequest } from "../../services/moviesAPI";

export const useUpdateShoppingCart = () => {
    const { shoppingCart } = useShoppingCartStore();
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        const updateShoppingCartDb = async () => {
            if (shoppingCart.length === 0) {
                return;
            }
            const aux = shoppingCart.map((m) => {
                return {
                    movie: m.id,
                    quantity: m.quantity,
                };
            });
            await updateShoppingCartRequest(aux);
        };
        console.info("updateBaseDatosAAAA");
        updateShoppingCartDb();
    }, [shoppingCart]);
};
