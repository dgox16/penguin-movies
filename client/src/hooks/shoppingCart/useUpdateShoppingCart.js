import { useEffect, useState } from "react";
import { useShoppingCartStore } from "../../store/shoppingCart";
import { updateShoppingCartRequest } from "../../services/shoppingCartRequest";

export const useUpdateShoppingCart = () => {
    const { shoppingCart } = useShoppingCartStore();
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        const updateShoppingCartDb = async () => {
            const aux = shoppingCart.map((m) => {
                return {
                    movie: m.id,
                    quantity: m.quantity,
                };
            });
            await updateShoppingCartRequest(aux);
        };
        updateShoppingCartDb();
    }, [shoppingCart]);
};
