import {Ingredient} from "../types";
import {ShoppingCartItem} from "../types/ShoppingCartItem";

export const calculateShoppingCart = (cart: ShoppingCartItem[]) : Ingredient[] => {
  const result = new Map<string, Ingredient>();
  cart.forEach((c) => {
    c.recipe.ingredients.forEach(({name, amount, amountType}) => {
      if (result.has(name)) {
        // @ts-ignore
        result.get(name).amount += amount;
      } else {
        result.set(name, {
          name, amount, amountType
        });
      }
    });
  })
  return Array.from(result.values());
};
